# backend/taskmanager/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('task.urls')),  # Add this line to include task app URLs
]