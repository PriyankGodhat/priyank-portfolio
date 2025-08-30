import * as React from "react"
import { X } from "lucide-react"
import { Button } from "./button"
import { useForm, ValidationError } from '@formspree/react'

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
  const [state, handleSubmit] = useForm("myzdenwp")

  // Handle successful submission
  React.useEffect(() => {
    if (state.succeeded) {
      alert(`Thank you for your interest in ${projectTitle}! We'll be in touch soon.`)
      onSubmit({
        name: "Form submitted successfully",
        email: "via Formspree",
        company: "",
        role: ""
      })
      // Close modal after showing success message
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }, [state.succeeded, projectTitle, onSubmit, onClose])

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

          {/* Hidden fields for Formspree */}
          <input type="hidden" name="project" value={projectTitle} />
          <input type="hidden" name="_subject" value={`New Interest Form Submission for ${projectTitle}`} />

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
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-sm text-red-500 mt-1"
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
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-sm text-red-500 mt-1"
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
            <ValidationError 
              prefix="Company" 
              field="company"
              errors={state.errors}
              className="text-sm text-red-500 mt-1"
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
            <ValidationError 
              prefix="Role" 
              field="role"
              errors={state.errors}
              className="text-sm text-red-500 mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={state.submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={state.submitting}
            >
              {state.submitting ? "Submitting..." : "Submit Interest"}
            </Button>
          </div>

          {state.succeeded && (
            <div className="text-green-600 text-sm text-center">
              ✅ Thank you! Your interest has been submitted successfully.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export { Modal, ModalContent, InterestForm }