import * as XLSX from 'xlsx';

/**
 * Reads an Excel file (blob or array buffer) and returns the data as JSON.
 * @param {File | ArrayBuffer} file - The file object or array buffer to read.
 * @returns {Promise<Array<Object>>} - Resolves to an array of objects representing the rows.
 */
export const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0]; // Read the first sheet
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);

        if (file instanceof File) {
            reader.readAsBinaryString(file);
        } else {
            // If it's already an array buffer (from fetch)
            try {
                const workbook = XLSX.read(file, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        }
    });
};

/**
 * Fetches the default Excel file from the public folder.
 * @param {string} url - The URL of the Excel file.
 * @returns {Promise<Array<Object>>} - Resolves to the parsed data.
 */
export const fetchDefaultExcel = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return parseExcelFile(arrayBuffer);
};
