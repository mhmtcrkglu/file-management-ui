import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  files: File[] = [];
  selectedFiles: File[] = []; 

  constructor(private fileService: FileService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.fileService.getItems().subscribe(data => {
      this.files = data.files;
    });
  }

  onFileSelectionChange(file: File): void {
    if (file.selected) {
      this.selectedFiles.push(file);
    } else {
      const index = this.selectedFiles.indexOf(file);
      if (index > -1) {
        this.selectedFiles.splice(index, 1);
      }
    }
  }

  onDownloadSelectedClick(): void {
    const downloadingSnackBarRef = this.snackBar.open('Downloading files...', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-bar-loading',
    });
  
    let successfulDownloads = 0;
    let failedDownloads = 0;
  
    const totalFiles = this.selectedFiles.length;
  
    this.selectedFiles.forEach((file) => {
      this.fileService.downloadFile(file.id).subscribe({
        next: (fileData) => {
          const url = window.URL.createObjectURL(fileData);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.id;
          a.click();
          window.URL.revokeObjectURL(url);
  
          successfulDownloads++;
  
          if (successfulDownloads + failedDownloads === totalFiles) {
            downloadingSnackBarRef.dismiss();
            this.showFinalSnackBar(successfulDownloads, failedDownloads);
            window.location.reload();
          }
        },
        error: () => {
          failedDownloads++;
  
          if (successfulDownloads + failedDownloads === totalFiles) {
            downloadingSnackBarRef.dismiss();
            this.showFinalSnackBar(successfulDownloads, failedDownloads);
            window.location.reload();
          }
        },
      });
    });
  }
  
  
  private showFinalSnackBar(successful: number, failed: number): void {
    if (failed === 0) {
      this.snackBar.open(`All ${successful} file(s) downloaded successfully!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-bar-success',
      });
    } else {
      this.snackBar.open(
        `${successful} file(s) downloaded successfully, ${failed} failed.`,
        'Close',
        {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snack-bar-error',
        }
      );
    }
  }

}
