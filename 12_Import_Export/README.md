# 12 - Data Import and Export in MongoDB

Learn to use official MongoDB Database Tools (`mongoimport` and `mongoexport`) to transfer data using JSON and CSV formats.

---

## 1. Overview of Tools

The MongoDB Database Tools are standalone CLI utilities:
- **`mongoimport`**: Ingests data from extended JSON, CSV, or TSV into a MongoDB collection.
- **`mongoexport`**: Exports data from a collection to a JSON or CSV file.

---

## 2. Importing Data (`mongoimport`)

### Case A: Importing a JSON Array (`--jsonArray`)
When the file contains a standard JSON array (`[ { ... }, { ... } ]`), use `--jsonArray`:
```bash
mongoimport --db mydb --collection products --file user2.json --jsonArray
```

### Case B: Importing Line-Delimited JSON (NDJSON)
When each document is on its own line without surrounding brackets:
```bash
mongoimport --db mydb --collection users --file users.json
```

### Case C: Importing a CSV File (`--type=csv`)
Use `--headerline` to use the first row of the CSV as field names:
```bash
mongoimport --db mydb --collection users --type=csv --headerline --file test.csv
```

---

## 3. Exporting Data (`mongoexport`)

### Export to JSON Array:
```bash
# Export collection to formatted JSON array
mongoexport --db mydb --collection users --out test.json --jsonArray
```

### Export to CSV:
When exporting to CSV, you must explicitly specify which fields to include using `--fields`:
```bash
mongoexport --db mydb --collection users --type=csv --fields id,name,email,website --out users_export.csv
```

---

## 4. Key CLI Flags Reference

| Option | Shorthand | Description | Example |
| :--- | :--- | :--- | :--- |
| `--db` | `-d` | Target database name | `--db mydb` |
| `--collection` | `-c` | Target collection name | `--collection users` |
| `--file` | None | Source input file path | `--file users.json` |
| `--out` | `-o` | Output file path for export | `--out test.json` |
| `--jsonArray` | None | Ingest/export as standard JSON array `[...]` | `--jsonArray` |
| `--type` | None | Input/output file format (`json` or `csv`) | `--type=csv` |
| `--headerline` | None | (CSV only) Treats row 1 as field keys | `--headerline` |
| `--drop` | None | Drops collection before importing new data | `--drop` |
