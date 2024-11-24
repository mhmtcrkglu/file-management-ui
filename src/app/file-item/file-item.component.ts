import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { File } from '../file.model'

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent{
  @Input()
  file!: File;
  selectedFiles: string[] = [];
  @Output() selectionChange: EventEmitter<File> = new EventEmitter();
  iconName: string = 'file_download'; 
  
  constructor(private fileService: FileService, private snackBar: MatSnackBar) {}

  onFileSelectChange(file: File) {
    this.selectionChange.emit(file);
  }

  onDownloadClick(fileId: string): void {
    const downloadingSnackBarRef = this.snackBar.open('Downloading file...', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-bar-loading',
    });
  
    this.fileService.downloadFile(fileId).subscribe({
      next: (file) => {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileId;
        a.click();
        window.URL.revokeObjectURL(url);
  
        downloadingSnackBarRef.dismiss();
        this.snackBar.open('File downloaded successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snack-bar-success',
        });
  
        window.location.reload();
      },
      error: () => {
        downloadingSnackBarRef.dismiss();
        this.snackBar.open('Failed to download the file.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snack-bar-error',
        });
      },
    });
  }  

  onGenerateShareLinkClick(fileName: string): void {
    this.fileService.generateShareLink(fileName).subscribe((link) => {
      navigator.clipboard.writeText(link.url).then(() => {
        this.snackBar.open('Link copied!', 'Close', { duration: 3000 });
      }).catch(err => {
        console.error('Failed to copy link: ', err);
        this.snackBar.open('Failed to copy link', 'Close', { duration: 3000 });
      });
    });
  }

  onPreviewClick(fileId: string): void {
    const googleViewerUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    window.open(googleViewerUrl, '_blank');
  }

  getEllipsisName(name: string, maxLength: number): string {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  }

  getFileIconName(): string {
    switch (this.file.type) {
      case 'application/pdf': return 'picture_as_pdf';
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif': return 'image';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'article';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': return 'grid_on';
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': return 'slideshow';
      case 'text/plain': return 'text_snippet';
      case 'application/zip':
      case 'application/x-7z-compressed':
      case 'application/x-rar-compressed': return 'archive';
      default: return 'file_present';
    }
  }
}
