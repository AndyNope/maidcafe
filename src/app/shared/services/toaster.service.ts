import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, content: string) {
    this.toastr.success(content, title);
  }

  showError(title: string, content: string) {
    this.toastr.error(content, title);
  }
}
