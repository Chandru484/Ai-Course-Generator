export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our team</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Get Support</h2>
            <p className="text-gray-700 mb-6">
              Need help with your course creation? Our support team is here to assist you.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">support@aicoursegenerator.com</p>
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-gray-600">Check our setup guide for detailed instructions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
