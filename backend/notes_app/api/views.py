from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .serializers import NotesSerializer, NoteSerializer
from notes_app.models import Note

class NotesView(generics.ListCreateAPIView):
    
    queryset = Note.objects.all()
    serializer_class = NotesSerializer

class NoteView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer