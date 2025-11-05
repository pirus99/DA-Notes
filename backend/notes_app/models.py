from django.db import models

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    type = models.CharField(max_length=50)
    marked = models.BooleanField()

    def __str__(self):
        return self.title