import { useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

const FileUpload = ({
    label,
    name,
    onChange,
    required = false,
    accept = "image/*",
    className = ''
}) => {
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }

            if (onChange) {
                onChange(e);
            }
        }
    };

    const clearFile = () => {
        setPreview(null);
        setFileName('');
        if (onChange) {
            onChange({ target: { name, files: [] } });
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}

            <div className="relative">
                {!preview ? (
                    <label
                        htmlFor={name}
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-indigo-300 transition-all group"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                            <p className="mb-1 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                            id={name}
                            name={name}
                            type="file"
                            className="hidden"
                            accept={accept}
                            onChange={handleFileChange}
                            required={required}
                        />
                    </label>
                ) : (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={clearFile}
                            className="absolute top-2 right-2 bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 shadow-lg transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>

            {fileName && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileImage size={16} />
                    <span>{fileName}</span>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
