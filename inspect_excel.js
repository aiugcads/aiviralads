
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

async function inspectExcel() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'aiviral_data.xlsx');
        console.log("Reading file from:", filePath);

        const workbook = XLSX.readFile(filePath);

        console.log("Sheets:", workbook.SheetNames);

        for (const sheetName of workbook.SheetNames) {
            console.log(`\n--- Sheet: ${sheetName} ---`);
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            if (data.length > 0) {
                console.log("Headers:", data[0]);
                // Print a few rows to guess data types
                if (data.length > 1) console.log("Row 1:", data[1]);
                if (data.length > 2) console.log("Row 2:", data[2]);
            } else {
                console.log("Empty sheet");
            }
        }
    } catch (error) {
        console.error("Error reading excel:", error);
    }
}

inspectExcel();
