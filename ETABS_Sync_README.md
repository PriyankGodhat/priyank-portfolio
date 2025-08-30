# ETABS File Synchronization Tool

A Python-based tool for synchronizing changes from two different versions of ETABS structural engineering models using three-way merge algorithms, similar to version control systems but designed specifically for structural engineering models.

## Current Status: Phase 1 Development

**🚧 Development Phase**: Foundation & Setup (Week 1-2)  
**📋 Version**: 1.0.0-dev  
**📅 Last Updated**: August 11, 2025

### Phase 1 Complete ✅
- [x] Production project structure
- [x] Robust ETABS COM API wrapper
- [x] Comprehensive error handling
- [x] Multi-level logging system
- [x] Configuration management
- [x] Unit testing framework
- [x] CLI interface foundation

## Overview

This tool addresses the critical need for collaboration on ETABS structural models without losing engineering work. When multiple engineers work on copies of the same model, merging their changes back together is currently a manual, error-prone process.

### Key Features (Planned)

- **Three-Way Merge**: Compare two modified versions against original model
- **Automatic Conflict Detection**: Identify when both versions modified same elements
- **Safe Model Modification**: Apply changes to original model with backup/rollback
- **Comprehensive Reporting**: Detailed logs of all changes and conflicts
- **Engineering-Safe**: Conservative approach prioritizing structural integrity

## Installation

### Prerequisites

- Python 3.7 or higher
- ETABS installation with valid license
- Windows operating system (ETABS COM API requirement)

### Development Installation

```bash
# Clone repository
git clone https://github.com/anthropics/etabs-sync-cli.git
cd etabs-sync-cli

# Install in development mode
pip install -e .

# Or install with all dependencies
pip install -e .[dev,docs]

# Install from requirements file
pip install -r requirements.txt
```

## Usage

### Command Line Interface

```bash
# Test ETABS connection
etabs-sync test-connection

# Merge two model versions (Phase 1: validation only)
etabs-sync merge root.edb version_a.edb version_b.edb

# Extract model data for analysis
etabs-sync extract model.edb --output data.json

# Compare two models
etabs-sync compare model1.edb model2.edb --output comparison.json
```

### Configuration

Create a configuration file `etabs_sync.yaml`:

```yaml
etabs:
  connection_timeout: 30
  retry_attempts: 3
  
extraction:
  coordinate_tolerance: 1e-6
  include_materials: true
  include_sections: true
  
logging:
  level: INFO
  file_logging: true
```

## Development Status

### Phase 1: Foundation & Setup ✅ COMPLETE
- **Duration**: Week 1-2
- **Status**: Complete
- **Deliverables**: 
  - Production project structure
  - ETABS API integration with POC-proven patterns
  - Comprehensive logging and error handling
  - Configuration system
  - Unit testing framework

### Phase 2: Data Extraction & Modeling (Next)
- **Duration**: Week 3-5  
- **Status**: Not Started
- **Goals**: Extract structural data from ETABS models

### Phase 3: Comparison Engine
- **Duration**: Week 6-8
- **Status**: Planned
- **Goals**: Compare models and identify changes

### Phase 4: Merge Engine & Conflict Detection  
- **Duration**: Week 9-12
- **Status**: Planned
- **Goals**: Three-way merge with conflict resolution

### Phase 5: Model Modification & Validation
- **Duration**: Week 13-15
- **Status**: Planned
- **Goals**: Apply changes to original models safely

### Phase 6: Testing & Refinement
- **Duration**: Week 16-18
- **Status**: Planned
- **Goals**: Production-ready tool with comprehensive testing

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Root.edb      │    │   VersionA.edb  │    │   VersionB.edb  │
│   (Original)    │    │   (Modified)    │    │   (Modified)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              Data Extraction Layer (ETABS API)                  │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│            Incremental Model Modification                       │
│      (Apply Changes to Original Root.edb + Reports)            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌─────────────────┐
                    │ Modified        │
                    │ Root.edb        │
                    │ (Final Result)  │
                    └─────────────────┘
```

## Testing

### Running Tests

```bash
# Run all tests
pytest

# Run only unit tests
pytest -m unit

# Run with coverage report
pytest --cov=src/etabs_sync_cli --cov-report=html

# Run specific test file
pytest tests/unit/test_connection.py

# Skip tests requiring ETABS
pytest -m "not requires_etabs"
```

### Test Categories

- **Unit Tests**: Test individual components with mocked dependencies
- **Integration Tests**: Test component interactions (requires ETABS)
- **Performance Tests**: Test with large models (slow)

## Project Structure

```
etabs_sync_cli_v2/
├── src/etabs_sync_cli/           # Main source code
│   ├── cli.py                    # Command-line interface
│   ├── etabs_api/                # ETABS COM API wrapper
│   │   ├── connection.py         # Connection management
│   │   └── exceptions.py         # API-specific exceptions
│   ├── utils/                    # Common utilities
│   │   ├── config.py             # Configuration management
│   │   └── logging_setup.py      # Logging configuration
│   └── data_model/               # Internal data structures (Phase 2)
├── tests/                        # Test suite
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── fixtures/                 # Test data
├── docs/                         # Documentation
├── examples/                     # Usage examples
└── test_models/                  # Sample ETABS models
```

## Contributing

This project follows the development plan outlined in `development_plan.md` and implements best practices from `DEVELOPMENT_GUIDELINES.md`.

### Development Guidelines

1. **All ETABS API calls must check return codes**
2. **Use immutable data structures**  
3. **Comprehensive logging for all operations**
4. **Work with existing models first, avoid creating new models**
5. **Always backup models before modification**

### Code Quality

- **Type Hints**: All functions should have type hints
- **Documentation**: All modules and classes need docstrings
- **Testing**: 80%+ test coverage required
- **Linting**: Code must pass flake8 and black formatting

## License

MIT License - See LICENSE file for details

## Support

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Documentation**: See `docs/` directory for detailed documentation
- **Development Plan**: See `development_plan.md` for roadmap

---

**Note**: This tool is in active development. Phase 1 (Foundation) is complete and ready for Phase 2 (Data Extraction) development. The POC results in `POC_ACTUAL_RESULTS.md` validate the technical approach.