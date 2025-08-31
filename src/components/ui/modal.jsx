import * as React from "react"
import { X } from "lucide-react"
import { Button } from "./button"

const Modal = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Project Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

const ModalContent = ({ className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
)

const InterestForm = ({ projectTitle, onClose, onSubmit }) => {
  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Interest in ${projectTitle}`)
    const body = encodeURIComponent(`Hi Priyank,

I'm interested in learning more about ${projectTitle}. 

Please share more details about:
- How to get started
- Pricing/licensing information
- Technical requirements
- Demo availability

Best regards,
[Your Name]
[Your Company]
[Your Role]`)
    
    const mailtoLink = `mailto:priyankgodhat121@gmail.com?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
    
    // Close modal after opening email
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-background border rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Contact via Email</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Interested in <strong>{projectTitle}</strong>? Click below to send me an email with a pre-filled template.
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Email will be sent to:</p>
            <p className="text-sm text-muted-foreground">priyankgodhat121@gmail.com</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEmailClick}
              className="flex-1"
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Modal, ModalContent, InterestForm }