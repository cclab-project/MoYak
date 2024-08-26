import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please select at least one file!");
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_PYTHON_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // 서버에서 받은 결과를 저장
            console.log(response);
            setResults(response.data);
            setLoading(false);
        } catch (error) {
            console.error("There was an error uploading the files!", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload Images for Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Upload"}
                </button>
            </form>
            {(results.length > 0) && (
                <div>
                    {/* <h3>Results:</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result.pillid}, {result.name}, {result.ingredient}</li>
                        ))}
                    </ul> */}
                </div>
            )}
        </div>
    );
}

export default FileUpload;
