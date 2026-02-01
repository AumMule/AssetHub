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
                <label className="text-sm font-semibold text-[#2B1B60]">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                {!preview ? (
                    <label
                        htmlFor={name}
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
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
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-gray-200">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={clearFile}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
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
