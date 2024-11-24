# File Management System UI

The **File Management System UI** is a frontend application for managing and interacting with various document types. This project is built using Angular and supports viewing, uploading, sharing, and downloading documents such as PDFs, Excel files, Word documents, text files, and images. A document preview feature using Google Viewer is also included.

---

## Instructions on How to Run & Test the Application

### Prerequisites
- Install **Node.js** (v14 or higher).
- Install **Angular CLI** (v12 or higher).

### Steps to Run the Application

1. **Clone the Repository**
   ```sh
   git clone https://github.com/mhmtcrkglu/file-management-ui.git
   cd file-management-app
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Start the Application**
   ```sh
   npm start
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:4200`.

### Testing the Application
To test the application's functionality:
1. **Upload Files**: Verify upload functionality by adding supported files (PDF, Excel, Word, TXT, and images). Ensure multi-file upload is supported and works seamlessly.
2. **Preview Documents**: Confirm documents display correctly using the Google Viewer preview.
3. **Share Files**: Generate and test public links to ensure they expire as configured in the backend.
4. **Download Files**: Check file download functionality, including multi-file downloads. Select multiple files using the buttons on the cards' top-right corners and then use the "Download Selected" button that appears to download the chosen files.
5. **Static UI Features**: Explore sidebar and storage area components to review their presentation.

---

## Architecture and Design Decisions

### 1. **Component-Based Architecture**
The project is divided into modular and reusable components:
- **File Management Components**: Include `FileListComponent`, `FileUploadComponent`, `FilePreviewComponent`, and `FileShareComponent`.
- **UI Components**: Include `SidebarComponent`, `HeaderComponent`, and `StorageComponent`.

### 2. **Document Preview with Google Viewer**
Google Viewer is integrated for document previews, reducing the need for heavy processing on the frontend while ensuring compatibility across file types.

### 3. **Responsive Design**
The UI design is responsive to ensure a seamless user experience across devices.

### 4. **Service-Oriented Communication**
A centralized `file.service.ts` handles communication with the backend API for uploading, downloading, sharing, and retrieving file data.

### 5. **Hardcoded Placeholder UI**
Certain UI features, such as the sidebar menu and storage display, are hardcoded to serve as placeholders for future backend integration.

---

## Ideas and Proposals for Improvement

### From a User Perspective
1. **Enhanced Sharing Options**
   - Allow users to customize the expiration duration of shared links.
   - Add password-protection for shared links.

2. **Search and Filter**
   - Add search functionality to locate files quickly.
   - Implement filters to sort by file type, date, or name.

3. **User Notifications**
   - Notify users of upload success or failure.
   - Send alerts for expiring shared links.

4. **Drag-and-Drop Upload**
   - Improve the file upload experience by enabling drag-and-drop functionality.

5. **Folder Organization**
   - Allow users to create folders for better file organization.

---

### From a Technical Perspective
1. **Backend Integration**
   - Connect the sidebar menu and storage area with real-time backend data.
   - Implement a robust API to handle metadata, user authentication, and file operations.

2. **Improve Preview Functionality**
   - Use a custom document viewer to eliminate dependency on Google Viewer.
   - Add multi-page preview for documents.

3. **Performance Optimization**
   - Optimize large file uploads with chunked uploading.
   - Use lazy loading to enhance application performance.

4. **Cloud Storage Support**
   - Integrate with cloud storage platforms like AWS S3 or Google Cloud for scalable file storage.

5. **Testing and CI/CD**
   - Implement unit and end-to-end tests for critical features.
   - Set up a continuous integration/continuous deployment pipeline for seamless updates.

---

## Project Structure

```
frontend/
└── src/
    └── app/
        ├── file-item/
        │   ├── file-item.component.css
        │   ├── file-item.component.html
        │   └── file-item.component.ts
        ├── file-list/
        │   ├── file-list.component.css
        │   ├── file-list.component.html
        │   └── file-list.component.ts
        ├── header/
        │   ├── header.component.css
        │   ├── header.component.html
        │   └── header.component.ts
        ├── preview/
        │   ├── preview-file.component.css
        │   ├── preview-file.component.html
        │   └── preview-file.component.ts
        ├── sidebar/
        │   ├── sidebar.component.css
        │   ├── sidebar.component.html
        │   └── sidebar.component.ts
        ├── app-routing.module.ts
        ├── app.component.css
        ├── app.component.html
        ├── app.component.ts
        ├── app.module.ts
        ├── error.interceptor.ts
        ├── file.model.ts
        ├── file.service.ts
        └── share-file.model.ts
```

---

## Features
- **Upload Documents**: Upload PDF, Excel, Word, TXT, and image files.
- **Document List**: View uploaded documents with metadata.
- **Document Preview**: Preview files in-browser using Google Viewer.
- **Download and Share**: Download files or share them with expiration-controlled links.
- **UI Elements**: Sidebar menu and storage details for improved usability (currently static).

---
