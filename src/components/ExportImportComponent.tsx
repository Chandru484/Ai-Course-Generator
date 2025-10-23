'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StorageService } from '@/lib/storage'
import { Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'

interface ExportImportProps {
  onImportComplete?: () => void
}

export default function ExportImportComponent({ onImportComplete }: ExportImportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<{
    success: boolean
    message: string
    imported: number
    errors: string[]
  } | null>(null)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const exportData = await StorageService.exportCourses()
      const blob = new Blob([exportData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `courses-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting courses:', error)
      alert('Failed to export courses. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        setIsImporting(true)
        setImportResult(null)
        
        const result = await StorageService.importCourses(e.target?.result as string)
        
        setImportResult({
          success: result.errors.length === 0,
          message: result.errors.length === 0 
            ? `Successfully imported ${result.imported} courses!`
            : `Imported ${result.imported} courses with ${result.errors.length} errors.`,
          imported: result.imported,
          errors: result.errors
        })

        if (onImportComplete) {
          onImportComplete()
        }
      } catch (error) {
        console.error('Error importing courses:', error)
        setImportResult({
          success: false,
          message: 'Failed to import courses. Please check the file format.',
          imported: 0,
          errors: ['Invalid file format or corrupted data']
        })
      } finally {
        setIsImporting(false)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-4">
      {/* Export Section */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Download className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Export Courses</h3>
              <p className="text-sm text-gray-600">Download all your courses as a backup file</p>
            </div>
          </div>
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            variant="outline"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Upload className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Import Courses</h3>
              <p className="text-sm text-gray-600">Restore courses from a backup file</p>
            </div>
          </div>
          <label className="cursor-pointer">
            <Button 
              disabled={isImporting}
              variant="outline"
              asChild
            >
              <span>
                {isImporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </>
                )}
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Import Result */}
      {importResult && (
        <div className={`rounded-lg border p-4 ${
          importResult.success 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`p-1 rounded-full ${
              importResult.success ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {importResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${
                importResult.success ? 'text-green-900' : 'text-yellow-900'
              }`}>
                Import {importResult.success ? 'Successful' : 'Completed with Issues'}
              </h4>
              <p className={`text-sm mt-1 ${
                importResult.success ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {importResult.message}
              </p>
              
              {importResult.errors.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-yellow-900 mb-2">Issues encountered:</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {importResult.errors.map((error, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Backup Information</h4>
            <div className="text-sm text-gray-600 mt-1 space-y-1">
              <p>• Export creates a JSON file with all your courses and content</p>
              <p>• Import restores courses from a previously exported file</p>
              <p>• Backup files include course content, chapters, and metadata</p>
              <p>• Keep your backup files safe for data recovery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
