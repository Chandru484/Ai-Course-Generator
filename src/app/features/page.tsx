export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-xl text-gray-600">Discover what makes our AI Course Generator special</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">AI Content Generation</h3>
            <p className="text-gray-600">Generate comprehensive course content using advanced AI technology.</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Video Integration</h3>
            <p className="text-gray-600">Automatically find and integrate relevant YouTube videos.</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Easy Management</h3>
            <p className="text-gray-600">Organize and manage your courses with our intuitive dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
