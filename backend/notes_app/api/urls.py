from django.urls import path
from notes_app.api.views import NotesView, NoteView

urlpatterns = [
    path('notes/', NotesView.as_view(), name='notes'),
    path('note/<int:pk>/', NoteView.as_view(), name='note-detail')
]