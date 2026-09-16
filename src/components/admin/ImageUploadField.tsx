import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, X, Loader2, Check } from 'lucide-react';
import { uploadImageFile, PRESET_IMAGE_GALLERY } from '../../services/imageService';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Item Photo / Image',
  helperText = 'Upload a photo from your computer, choose from existing gallery, or paste a direct image URL.'
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'gallery'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size is too large (Maximum 5MB).');
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImageFile(file);
      onChange(uploadedUrl);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-qc-body uppercase font-medium text-[11px] tracking-wider">
          {label} *
        </label>
        <div className="flex items-center gap-1 bg-qc-base border border-border-strong p-0.5 rounded">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded flex items-center gap-1 transition-all ${
              activeTab === 'upload' ? 'bg-purple-600 text-charcoal-950 shadow-sm' : 'text-qc-body hover:text-qc-primary'
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded flex items-center gap-1 transition-all ${
              activeTab === 'gallery' ? 'bg-purple-600 text-charcoal-950 shadow-sm' : 'text-qc-body hover:text-qc-primary'
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded flex items-center gap-1 transition-all ${
              activeTab === 'url' ? 'bg-purple-600 text-charcoal-950 shadow-sm' : 'text-qc-body hover:text-qc-primary'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            URL
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-purple-500 bg-purple-950/20'
              : 'border-border-strong hover:border-purple-600/60 bg-qc-base'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            accept="image/*"
            className="hidden"
          />

          {isUploading ? (
            <div className="py-4 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              <p className="text-xs text-qc-primary font-medium">Processing &amp; Uploading Image...</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center justify-center gap-1.5">
              <UploadCloud className="w-6 h-6 text-purple-400" />
              <p className="text-xs font-semibold text-qc-primary">
                Click to browse or drag &amp; drop an image
              </p>
              <p className="text-[11px] text-qc-body font-light">
                Supports PNG, JPG, WebP (Max 5MB)
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="bg-qc-base border border-border-strong p-3 rounded max-h-48 overflow-y-auto space-y-2">
          <p className="text-[10px] text-qc-body uppercase tracking-wider font-semibold mb-2">
            Select an existing restaurant asset:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESET_IMAGE_GALLERY.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  type="button"
                  key={preset.url}
                  onClick={() => onChange(preset.url)}
                  className={`group relative flex items-center gap-2 p-1.5 rounded border text-left transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/30'
                      : 'border-border-base bg-qc-surface hover:border-border-strong'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-10 h-10 object-cover rounded shrink-0 border border-border-base"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-qc-primary font-medium truncate group-hover:text-purple-400">
                      {preset.label}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mr-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'url' && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or /images/..."
            className="w-full bg-qc-base border border-border-strong px-3 py-2 text-xs text-qc-primary rounded focus:border-purple-500 focus:outline-none"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-red-400 text-xs mt-1">{errorMessage}</p>
      )}

      {/* Image Preview & Details */}
      {value && (
        <div className="flex items-center gap-3 p-2 bg-qc-surface border border-border-strong rounded">
          <div className="w-14 h-14 rounded overflow-hidden bg-qc-base border border-border-base shrink-0 relative group">
            <img
              src={value}
              alt="Selected Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Active Preview
              </span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-qc-body hover:text-red-400 p-1 transition-colors"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-qc-body truncate font-mono mt-0.5">
              {value}
            </p>
          </div>
        </div>
      )}

      <p className="text-[10px] text-qc-body font-light">
        {helperText}
      </p>
    </div>
  );
};
