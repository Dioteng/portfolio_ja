import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('frontend');
  protected readonly status = signal('checking...');

  ngOnInit(): void {
    this.http.get<{ status: string }>('/api/health').subscribe({
      next: (res) => this.status.set(res.status),
      error: () => this.status.set('DOWN (cannot reach backend)'),
    });
  }
}
