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
  const [result, setResult] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("Sending....")
    
    console.log('=== WEB3FORMS SUBMISSION DEBUG ===')
    console.log('Form event:', event)
    console.log('Project title:', projectTitle)
    
    const formData = new FormData(event.target)
    
    // Add the access key
    formData.append("access_key", "2c7f7bf7-7d3d-48ff-8dbb-9657938daf4e")
    
    // Log form data for debugging
    console.log('Form data being sent:')
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()
      console.log('Web3Forms response:', data)

      if (data.success) {
        setResult("Form Submitted Successfully")
        alert(`Thank you for your interest in ${projectTitle}! We'll be in touch soon.`)
        
        // Call the parent callback with form data
        const submittedData = {
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          role: formData.get('role')
        }
        onSubmit(submittedData)
        
        // Close modal after success
        setTimeout(() => {
          onClose()
        }, 2000)
        
        event.target.reset()
      } else {
        console.log("Error", data)
        setResult(data.message)
        alert('There was an error submitting your form. Please try again.')
      }
    } catch (error) {
      console.error('Web3Forms submission error:', error)
      setResult('Submission failed')
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-background border rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Interest Form</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Interested in trying <strong>{projectTitle}</strong>? Please fill out your information below.
            </p>
          </div>

          {/* Hidden fields for Web3Forms */}
          <input type="hidden" name="access_key" value="2c7f7bf7-7d3d-48ff-8dbb-9657938daf4e" />
          <input type="hidden" name="subject" value={`New Interest Form Submission for ${projectTitle}`} />
          <input type="hidden" name="project" value={projectTitle} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. Structural Engineer, Project Manager"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Interest"}
            </Button>
          </div>

          {result && (
            <div className={`text-sm text-center mt-4 ${
              result === "Form Submitted Successfully" 
                ? "text-green-600" 
                : result === "Sending...." 
                  ? "text-blue-600" 
                  : "text-red-500"
            }`}>
              {result === "Form Submitted Successfully" && "✅ "}
              {result}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export { Modal, ModalContent, InterestForm }