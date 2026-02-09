import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = [
    { Month: "Jan", Sales: 4000, Revenue: 2400, Profit: 2400 },
    { Month: "Feb", Sales: 3000, Revenue: 1398, Profit: 2210 },
    { Month: "Mar", Sales: 2000, Revenue: 9800, Profit: 2290 },
    { Month: "Apr", Sales: 2780, Revenue: 3908, Profit: 2000 },
    { Month: "May", Sales: 1890, Revenue: 4800, Profit: 2181 },
    { Month: "Jun", Sales: 2390, Revenue: 3800, Profit: 2500 },
    { Month: "Jul", Sales: 3490, Revenue: 4300, Profit: 2100 },
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Financials");

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const filePath = path.join(publicDir, 'data.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`Sample data generated at: ${filePath}`);
