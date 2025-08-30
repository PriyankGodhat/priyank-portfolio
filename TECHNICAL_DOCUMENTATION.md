# ETABS Sync CLI Technical Documentation

*Version 2.0 - Complete Technical Reference*

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Data Models](#data-models)
4. [API Reference](#api-reference)
5. [Error Handling](#error-handling)
6. [Performance Considerations](#performance-considerations)
7. [Extension Points](#extension-points)
8. [Development Guidelines](#development-guidelines)

---

## Architecture Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ETABS Sync CLI v2.0                         │
├─────────────────────────────────────────────────────────────────┤
│  CLI Interface  │  Python API  │  Configuration  │  Reporting  │
├─────────────────────────────────────────────────────────────────┤
│           Phase 5: Model Modification & Validation             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ Model Modifier  │ │   Validator     │ │   Reporter      │  │
│  │   - Apply       │ │ - Check Rules   │ │ - Generate      │  │
│  │   - Rollback    │ │ - Validate      │ │ - Document      │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│             Phase 4: Merge Engine & Conflict Detection         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ Three-Way Merge │ │ Conflict Detect │ │ Auto Resolver   │  │
│  │   - Decision    │ │ - Classify      │ │ - Rules Engine  │  │
│  │   - Tree Logic  │ │ - Report        │ │ - Strategies    │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                 Phase 3: Comparison Engine                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ Element Matcher │ │ Change Detector │ │ Model Compare   │  │
│  │   - Fingerprint │ │ - Diff Changes  │ │ - Two-Way Comp  │  │
│  │   - Fuzzy Match │ │ - Classify      │ │ - Report Gen    │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│              Phase 2: Data Extraction & Modeling              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ Model Extractor │ │ Element Extract │ │   Data Model    │  │
│  │   - Coordinate  │ │ - Joint/Frame   │ │ - Immutable     │  │
│  │   - Dependencies│ │ - Material/Sect │ │ - Serializable  │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                 Phase 1: Foundation & Setup                    │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │ ETABS API Conn  │ │ Error Handling  │ │   Utilities     │  │
│  │   - COM Inter   │ │ - Recovery      │ │ - Logging       │  │
│  │   - File Ops    │ │ - Diagnostics   │ │ - Config        │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Safety-First Engineering**: All operations preserve data integrity
2. **Immutable Data Structures**: Prevent accidental data corruption
3. **Tolerance-Based Comparisons**: Handle floating-point precision correctly
4. **Comprehensive Logging**: Full audit trail of all operations
5. **Layered Architecture**: Clear separation of concerns
6. **Error Recovery**: Robust handling of failure scenarios

### Technology Stack

- **Python 3.8+**: Core implementation language
- **comtypes**: COM API interface to ETABS
- **dataclasses**: Immutable data structure definitions
- **psutil**: System resource monitoring
- **logging**: Comprehensive operation logging
- **pathlib**: Modern file system operations

---

## System Components

### Phase 1: Foundation Components

#### ETABSConnection
**Location**: `src/etabs_sync_cli/etabs_api/connection.py`

Manages ETABS COM API connections with robust error handling.

```python
class ETABSConnection:
    def __init__(self, logger: Optional[logging.Logger] = None)
    def connect(self) -> bool
    def open_model(self, file_path: Path) -> bool
    def save_model(self, file_path: Optional[Path] = None) -> bool
    def close_model(self) -> None
    def disconnect(self) -> None
```

**Key Features**:
- Automatic retry mechanisms for connection failures
- Support for existing and new ETABS instances
- Comprehensive error reporting with return code analysis
- Connection health monitoring

#### Error Handling System
**Location**: `src/etabs_sync_cli/utils/error_handler.py`

Hierarchical error handling with recovery strategies.

```python
class ETABSSyncError(Exception):
    def __init__(self, message: str, severity: ErrorSeverity, 
                 category: ErrorCategory, context: Optional[ErrorContext])

class ErrorHandler:
    def handle_error(self, error: Exception, context: Optional[ErrorContext])
    def attempt_recovery(self, error: ETABSSyncError) -> Optional[Any]
    def get_error_summary(self) -> Dict
```

**Error Categories**:
- `ETABS_API`: ETABS COM API errors
- `FILE_SYSTEM`: File access and manipulation errors
- `DATA_VALIDATION`: Data integrity and validation errors
- `MEMORY`: Memory allocation errors
- `CONFIGURATION`: Setup and configuration errors

### Phase 2: Data Extraction Components

#### ModelExtractor
**Location**: `src/etabs_sync_cli/extraction/model_extractor.py`

Coordinates extraction of complete structural model data.

```python
class ModelExtractor:
    def extract_complete_model(self, model_path: Path) -> StructuralModel
    def extract_joints(self) -> List[Joint]
    def extract_frames(self) -> List[Frame]
    def extract_materials(self) -> List[Material]
    def extract_sections(self) -> List[Section]
```

#### Data Model Classes
**Location**: `src/etabs_sync_cli/data_model/`

Immutable data structures representing structural elements.

```python
@dataclass(frozen=True)
class Joint:
    name: str
    element_type: ElementType
    coordinates: Point3D
    
    def fingerprint(self) -> str
    def distance_to(self, other: 'Joint') -> float

@dataclass(frozen=True)
class Frame:
    name: str
    element_type: ElementType
    start_joint: str
    end_joint: str
    material_name: str
    section_name: str
    
    def fingerprint(self) -> str
    def connectivity_hash(self) -> str
```

### Phase 3: Comparison Components

#### ChangeDetector
**Location**: `src/etabs_sync_cli/comparison/change_detector.py`

Detects and classifies changes between structural models.

```python
class ChangeDetector:
    def detect_changes(self, original: StructuralModel, 
                      modified: StructuralModel) -> List[ElementChange]
    def compare_joints(self, joints_a: List[Joint], 
                      joints_b: List[Joint]) -> List[ElementChange]
    def classify_change_impact(self, change: ElementChange) -> ChangeImpact
```

**Change Types**:
- `ADDED`: New elements in modified version
- `REMOVED`: Elements deleted from original
- `MODIFIED`: Properties changed
- `MOVED`: Coordinate changes

#### ModelComparator
**Location**: `src/etabs_sync_cli/comparison/model_comparator.py`

High-level model comparison with comprehensive reporting.

```python
class ModelComparator:
    def compare_models(self, model_a_path: Path, 
                      model_b_path: Path) -> ComparisonResult
    def generate_comparison_report(self, result: ComparisonResult) -> str
```

### Phase 4: Merge Engine Components

#### ThreeWayMerger
**Location**: `src/etabs_sync_cli/merge/three_way_merger.py`

Implements three-way merge algorithm adapted for structural data.

```python
class ThreeWayMerger:
    def merge_models(self, root: StructuralModel, version_a: StructuralModel, 
                    version_b: StructuralModel) -> MergeResult
    def create_merge_instructions(self, changes_a: List[ElementChange], 
                                changes_b: List[ElementChange]) -> List[MergeInstruction]
```

#### ConflictDetector
**Location**: `src/etabs_sync_cli/merge/conflict_detector.py`

Identifies and classifies conflicts between competing changes.

```python
class ConflictDetector:
    def detect_conflicts(self, instructions: List[MergeInstruction]) -> List[Conflict]
    def classify_conflict(self, conflict: Conflict) -> ConflictType
```

**Conflict Types**:
- `COORDINATE_CONFLICT`: Same element moved to different locations
- `PROPERTY_CONFLICT`: Different property modifications
- `ADD_REMOVE_CONFLICT`: One version adds, other removes
- `DEPENDENCY_CONFLICT`: Conflicting dependency relationships

### Phase 5: Model Modification Components

#### ModelModifier
**Location**: `src/etabs_sync_cli/modification/model_modifier.py`

Applies merged changes to ETABS models with backup/rollback capability.

```python
class ModelModifier:
    def apply_merge_result(self, merge_result: MergeResult, 
                          model_path: Path) -> ModificationResult
    def create_backup(self, model_path: Path) -> BackupInfo
    def rollback_changes(self, backup_info: BackupInfo) -> bool
```

#### ModificationValidator
**Location**: `src/etabs_sync_cli/modification/modification_validator.py`

Validates modifications for structural integrity and ETABS compliance.

```python
class ModificationValidator:
    def validate_modifications(self, model_path: Path, 
                             instructions: List[MergeInstruction]) -> ModificationValidationReport
    def validate_structural_integrity(self, instructions: List[MergeInstruction])
    def validate_etabs_limits(self, instructions: List[MergeInstruction])
```

---

## Data Models

### Core Data Structures

#### ElementType Enumeration
```python
class ElementType(Enum):
    JOINT = "joint"
    FRAME = "frame"
    MATERIAL = "material"
    SECTION = "section"
    LOAD = "load"
```

#### Geometric Primitives
```python
@dataclass(frozen=True)
class Point3D:
    x: float
    y: float
    z: float
    
    def distance_to(self, other: 'Point3D') -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2 + (self.z - other.z)**2)**0.5
    
    def is_close_to(self, other: 'Point3D', tolerance: float = 1e-6) -> bool:
        return self.distance_to(other) < tolerance
```

#### Structural Elements

**Joint (Point) Element**:
```python
@dataclass(frozen=True)
class Joint:
    name: str
    element_type: ElementType
    coordinates: Point3D
    restraints: Optional[Dict[str, bool]] = None
    local_axes: Optional[Dict[str, float]] = None
    
    def fingerprint(self) -> str:
        """Generate unique fingerprint based on coordinates"""
        return f"J_{self.coordinates.x:.6f}_{self.coordinates.y:.6f}_{self.coordinates.z:.6f}"
```

**Frame Element**:
```python
@dataclass(frozen=True)
class Frame:
    name: str
    element_type: ElementType
    start_joint: str
    end_joint: str
    material_name: str
    section_name: str
    local_axes: Optional[Dict[str, float]] = None
    releases: Optional[Dict[str, bool]] = None
    
    def fingerprint(self) -> str:
        """Generate unique fingerprint based on connectivity"""
        joints = sorted([self.start_joint, self.end_joint])
        return f"F_{joints[0]}_{joints[1]}_{self.section_name}"
```

**Material Definition**:
```python
@dataclass(frozen=True)
class Material:
    name: str
    element_type: ElementType
    material_type: MaterialType
    yield_strength: float  # Pa
    modulus_of_elasticity: float  # Pa
    poissons_ratio: float
    thermal_expansion: float  # /°C
    
    def is_steel(self) -> bool:
        return self.material_type == MaterialType.STEEL
    
    def is_concrete(self) -> bool:
        return self.material_type == MaterialType.CONCRETE
```

### Change Tracking

#### ElementChange
```python
@dataclass(frozen=True)
class ElementChange:
    change_type: ChangeType
    element_type: ElementType
    element_name: str
    source_element: Optional[Any] = None
    target_element: Optional[Any] = None
    impact_level: ChangeImpact = ChangeImpact.MINOR
    impact_reason: str = ""
    
    def get_change_description(self) -> str:
        if self.change_type == ChangeType.ADDED:
            return f"Added {self.element_type.value} '{self.element_name}'"
        elif self.change_type == ChangeType.REMOVED:
            return f"Removed {self.element_type.value} '{self.element_name}'"
        elif self.change_type == ChangeType.MODIFIED:
            return f"Modified {self.element_type.value} '{self.element_name}'"
        elif self.change_type == ChangeType.MOVED:
            return f"Moved {self.element_type.value} '{self.element_name}'"
```

### Merge Operations

#### MergeInstruction
```python
@dataclass(frozen=True)
class MergeInstruction:
    element_name: str
    element_type: ElementType
    decision: MergeDecision
    applied_change: Optional[ElementChange] = None
    resolution_rationale: str = ""
    
    def requires_api_call(self) -> bool:
        return self.decision in [MergeDecision.ACCEPT_A, MergeDecision.ACCEPT_B]
```

#### MergeResult
```python
@dataclass
class MergeResult:
    merge_instructions: List[MergeInstruction] = field(default_factory=list)
    conflicts: List[Conflict] = field(default_factory=list)
    statistics: MergeStatistics = field(default_factory=MergeStatistics)
    validation_results: Optional[ValidationReport] = None
    
    @property
    def has_unresolved_conflicts(self) -> bool:
        return any(not c.resolution for c in self.conflicts)
    
    @property
    def success_rate(self) -> float:
        total = len(self.merge_instructions)
        return 1.0 if total == 0 else len([i for i in self.merge_instructions if i.decision != MergeDecision.MANUAL_RESOLUTION]) / total
```

---

## API Reference

### Public API Classes

#### ETABSSyncAPI
**Main programmatic interface for ETABS Sync CLI functionality.**

```python
class ETABSSyncAPI:
    def __init__(self, config_path: Optional[Path] = None, logger: Optional[logging.Logger] = None)
    
    def sync_models(self, root_model: Path, version_a: Path, version_b: Path, 
                   output_path: Path, **kwargs) -> SyncResult
    
    def compare_models(self, model_a: Path, model_b: Path, **kwargs) -> ComparisonResult
    
    def validate_model(self, model_path: Path, **kwargs) -> ValidationResult
    
    def extract_model_data(self, model_path: Path) -> StructuralModel
```

**Example Usage**:
```python
from etabs_sync_cli import ETABSSyncAPI

# Initialize API
api = ETABSSyncAPI()

# Perform three-way merge
result = api.sync_models(
    root_model=Path("original.edb"),
    version_a=Path("version_a.edb"),
    version_b=Path("version_b.edb"),
    output_path=Path("merged.edb"),
    interactive=False,
    auto_resolve=True,
    create_backup=True
)

# Check results
if result.success:
    print(f"Merge completed successfully")
    print(f"Applied {len(result.applied_instructions)} changes")
    print(f"Success rate: {result.statistics.success_rate:.1%}")
else:
    print(f"Merge failed: {result.error_message}")
    for error in result.errors:
        print(f"  - {error}")
```

### Configuration System

#### Configuration File Format
**etabs_sync_config.json**:
```json
{
  "connection": {
    "retry_attempts": 3,
    "timeout_seconds": 30,
    "prefer_existing_instance": true
  },
  "comparison": {
    "coordinate_tolerance": 1e-6,
    "property_tolerance": 1e-9,
    "ignore_roundoff_errors": true
  },
  "merge": {
    "auto_resolve_minor": true,
    "conflict_strategy": "conservative",
    "max_coordinate_change": 100.0
  },
  "modification": {
    "create_backup": true,
    "validate_before": true,
    "validate_after": true,
    "max_backups": 5
  },
  "reporting": {
    "generate_summary": true,
    "generate_technical": false,
    "generate_audit": false,
    "output_format": "text"
  },
  "logging": {
    "level": "INFO",
    "file_logging": true,
    "console_logging": true,
    "max_log_files": 10
  }
}
```

#### Loading Configuration
```python
from etabs_sync_cli.utils.config import ConfigurationManager

config = ConfigurationManager.load_config("my_config.json")
api = ETABSSyncAPI(config=config)
```

---

## Error Handling

### Exception Hierarchy

```python
ETABSSyncError                    # Base exception
├── ETABSAPIError                # ETABS COM API errors
│   ├── ConnectionError          # Connection failures
│   ├── ModelFileError          # Model file access issues
│   └── APIOperationError       # API operation failures
├── DataValidationError          # Data integrity issues
│   ├── ElementValidationError   # Element-specific validation
│   └── StructuralValidationError # Structural integrity issues
├── MergeError                   # Merge operation failures
│   ├── ConflictResolutionError  # Unresolvable conflicts
│   └── MergeValidationError     # Post-merge validation failures
└── ConfigurationError           # Configuration and setup issues
```

### Error Recovery Strategies

#### Automatic Retry with Exponential Backoff
```python
@with_error_handling(retry_config=RetryConfig(
    max_attempts=3,
    base_delay=1.0,
    exponential_backoff=True,
    retryable_exceptions=[ETABSAPIError]
))
def connect_to_etabs():
    # Connection logic here
    pass
```

#### Context-Aware Error Handling
```python
context = ErrorContext(
    operation="model_extraction",
    component="joint_extractor", 
    user_action="extracting joint data",
    model_path=model_path,
    element_name="J1"
)

try:
    extract_joint_data()
except Exception as e:
    error_handler.handle_error(e, context)
```

### Diagnostic System

#### System Health Checks
```python
from etabs_sync_cli.utils.diagnostics import SystemDiagnostics, DiagnosticLevel

diagnostics = SystemDiagnostics()
results = diagnostics.run_diagnostics(DiagnosticLevel.FULL)

if results['summary']['overall_health'] == 'critical':
    print("Critical issues detected:")
    for result in results['results']:
        if result['status'] in ['critical', 'failure']:
            print(f"  - {result['check_name']}: {result['message']}")
```

---

## Performance Considerations

### System Requirements

#### Minimum Performance Targets
- **Processing Speed**: 17+ elements per second (1000 elements in <60 seconds)
- **Memory Usage**: <5 KB per element average
- **Success Rate**: 95%+ for typical engineering scenarios

#### Optimization Strategies

**1. Efficient Data Structures**
```python
# Use immutable data structures to prevent copying
@dataclass(frozen=True)
class Joint:
    # Immutable fields only
    pass

# Use generators for large datasets
def extract_joints_generator(self) -> Iterator[Joint]:
    for name in joint_names:
        yield self.extract_single_joint(name)
```

**2. Batch Operations**
```python
# Batch ETABS API calls to reduce COM overhead
def extract_all_joint_coordinates(self) -> Dict[str, Point3D]:
    joint_names = self.get_all_joint_names()
    coordinates = {}
    
    for name in joint_names:
        result = self.sap_model.PointObj.GetCoordCartesian(name)
        if result[0] == 0:  # Success
            coordinates[name] = Point3D(result[1], result[2], result[3])
    
    return coordinates
```

**3. Memory Management**
```python
# Explicit cleanup for large models
def process_large_model(self, model_path: Path):
    try:
        model_data = self.extract_model(model_path)
        result = self.process_data(model_data)
        return result
    finally:
        # Force garbage collection
        del model_data
        gc.collect()
```

### Performance Monitoring

#### Built-in Profiling
```python
from etabs_sync_cli.utils.profiler import PerformanceProfiler

profiler = PerformanceProfiler()
profiler.start()

# Your operation here
result = api.sync_models(...)

duration, memory_mb, cpu_percent = profiler.stop()
print(f"Operation took {duration:.2f}s, used {memory_mb:.1f}MB peak memory")
```

#### Benchmark Integration
```python
from etabs_sync_cli.benchmarks import BenchmarkSuite

suite = BenchmarkSuite()
results = suite.run_complete_benchmark_suite()

if results['summary']['success_rate'] < 0.8:
    print("Performance below threshold - optimization needed")
```

---

## Extension Points

### Custom Validation Rules

```python
from etabs_sync_cli.modification.modification_validator import ModificationValidator, ValidationIssue

class CustomValidator(ModificationValidator):
    def _validate_custom_rules(self, instruction: MergeInstruction, report: ModificationValidationReport):
        # Add custom validation logic
        if instruction.element_name.startswith("TEMP_"):
            report.issues.append(ValidationIssue(
                severity=ValidationSeverity.WARNING,
                category="naming",
                element_name=instruction.element_name,
                description="Temporary element name detected",
                resolution_suggestion="Use permanent naming convention"
            ))

# Use custom validator
validator = CustomValidator()
```

### Custom Conflict Resolution Strategies

```python
from etabs_sync_cli.merge.conflict_resolver import ConflictResolver

class ProjectSpecificResolver(ConflictResolver):
    def _resolve_coordinate_conflict(self, conflict: Conflict) -> Optional[Resolution]:
        # Project-specific logic
        if "COLUMN" in conflict.element_name:
            # Always prefer structural engineer's coordinates for columns
            return Resolution.ACCEPT_VERSION_A
        return super()._resolve_coordinate_conflict(conflict)

# Use custom resolver
resolver = ProjectSpecificResolver()
```

### Custom Report Formats

```python
from etabs_sync_cli.modification.modification_reporter import ModificationReporter

class HTMLReporter(ModificationReporter):
    def generate_html_report(self, result: ModificationResult) -> str:
        # Generate HTML format report
        html = "<html><head><title>Modification Report</title></head><body>"
        html += f"<h1>Modification Results</h1>"
        html += f"<p>Status: {result.status.value}</p>"
        # Add more HTML content...
        html += "</body></html>"
        return html

# Use custom reporter
reporter = HTMLReporter()
html_report = reporter.generate_html_report(result)
```

---

## Development Guidelines

### Code Style and Standards

#### Immutable Data Structures
```python
# GOOD: Immutable dataclass
@dataclass(frozen=True)
class Joint:
    name: str
    coordinates: Point3D

# BAD: Mutable dataclass
@dataclass
class Joint:
    name: str
    coordinates: List[float]  # Mutable!
```

#### Tolerance-Based Comparisons
```python
# GOOD: Use tolerance for floating-point comparisons
COORDINATE_TOLERANCE = 1e-6

def coordinates_equal(coord1: Point3D, coord2: Point3D) -> bool:
    return coord1.is_close_to(coord2, COORDINATE_TOLERANCE)

# BAD: Exact floating-point comparison
if coord1.x == coord2.x:  # Will often fail due to precision
    pass
```

#### Comprehensive Error Handling
```python
# GOOD: Handle ETABS API return codes
result = sap_model.PointObj.AddCartesian(x, y, z, name)
if isinstance(result, (list, tuple)) and result[0] == 0:
    actual_name = result[1]
    return actual_name
else:
    raise ETABSAPIError(f"Failed to add point: return code {result[0]}")

# BAD: Assume API calls succeed
result = sap_model.PointObj.AddCartesian(x, y, z, name)
return result[1]  # May fail if result[0] != 0
```

#### Comprehensive Logging
```python
# GOOD: Detailed logging with context
self.logger.info(f"Starting extraction of {len(joint_names)} joints from {model_path}")
for i, name in enumerate(joint_names):
    self.logger.debug(f"Extracting joint {i+1}/{len(joint_names)}: {name}")
    joint = self.extract_joint(name)
    self.logger.debug(f"Joint {name} at coordinates ({joint.coordinates.x}, {joint.coordinates.y}, {joint.coordinates.z})")

# BAD: Minimal or no logging
for name in joint_names:
    joint = self.extract_joint(name)
```

### Testing Guidelines

#### Unit Test Structure
```python
class TestModelComparator:
    def test_detect_added_elements(self):
        # Arrange
        original_model = create_simple_model()
        modified_model = add_element_to_model(original_model, "J_NEW")
        
        # Act
        changes = self.comparator.detect_changes(original_model, modified_model)
        
        # Assert
        added_changes = [c for c in changes if c.change_type == ChangeType.ADDED]
        assert len(added_changes) == 1
        assert added_changes[0].element_name == "J_NEW"
```

#### Integration Test Patterns
```python
def test_complete_workflow_no_conflicts(self):
    with TemporaryDirectory() as temp_dir:
        # Create test models
        root_model = create_test_model("root", temp_dir)
        version_a = create_modified_model(root_model, "add_elements")
        version_b = create_modified_model(root_model, "modify_properties")
        
        # Run complete workflow
        api = ETABSSyncAPI()
        result = api.sync_models(root_model, version_a, version_b, temp_dir / "merged.edb")
        
        # Verify results
        assert result.success
        assert result.statistics.success_rate > 0.95
```

### Documentation Standards

#### Function Documentation
```python
def extract_joints(self, model_path: Path) -> List[Joint]:
    """
    Extract all joint elements from ETABS model.
    
    Args:
        model_path: Path to ETABS model file (.edb)
        
    Returns:
        List of Joint objects with coordinates and properties
        
    Raises:
        ETABSAPIError: If model cannot be opened or API calls fail
        ModelFileError: If model file is invalid or inaccessible
        
    Example:
        >>> extractor = ModelExtractor(connection)
        >>> joints = extractor.extract_joints(Path("model.edb"))
        >>> print(f"Found {len(joints)} joints")
    """
```

#### Module Documentation
```python
"""
Model Modification Module

Provides safe modification of ETABS models with backup/rollback capability.
Implements transaction-like behavior to ensure model integrity.

Key classes:
- ModelModifier: Main modification interface
- ModificationTransaction: Transaction context manager
- BackupManager: Backup and restore functionality

Example usage:
    modifier = ModelModifier(etabs_connection)
    result = modifier.apply_merge_result(merge_result, model_path)
    
    if result.was_successful:
        print(f"Applied {len(result.applied_instructions)} changes")
    else:
        print(f"Modification failed: {result.error_message}")
"""
```

---

*This technical documentation covers the complete ETABS Sync CLI v2.0 system architecture and implementation details. For user-oriented information, see the User Guide.*