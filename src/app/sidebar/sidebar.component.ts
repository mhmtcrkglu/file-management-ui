import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  files: File[] | null = null;
  selectedFiles: File[] = [];
  uploading: boolean = false;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  constructor(private fileService: FileService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input?.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.selectedFiles = this.checkFilesExtension(this.selectedFiles);
      this.uploadFiles();
    }
  }
  
  uploadFiles(): void {
    if (this.selectedFiles.length > 0) {
      this.snackBar.open('Uploading files...', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      this.uploading = true;
      this.uploadSuccess = false;
      this.uploadError = false;

      this.fileService.uploadFiles(this.selectedFiles).subscribe({
        next: () => {
          this.uploadSuccess = true;
          this.snackBar.open('Upload successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

          window.location.reload();
        },
        error: (err) => {
          console.error('Error uploading files:', err);
          this.uploadError = true;
          this.snackBar.open('Upload failed. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
        complete: () => {
          this.uploading = false;
        },
      });
    }
  }

  checkFilesExtension(files: File[]): File[] {
    const validFiles: File[] = [];
    const allowedExtensions = ['pdf', 'xlsx', 'xls', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif'];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
  
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        this.snackBar.open(`${fileName} has an invalid file type. Please upload PDF, Excel, Word, TXT, or image files.`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      } else {
        validFiles.push(file);
      }
    }
  
    return validFiles;
  }
  
}
