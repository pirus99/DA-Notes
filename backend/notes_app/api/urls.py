from django.contrib import admin
from django.urls import path
from notes_app.api.views import NotesView

urlpatterns = [
    path('notes/', NotesView.as_view(), name='notes')
]