import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from './todo.service';

interface Activity {
  id?: number;
  description: string;
  isCompleted?: boolean;
  isEditable?: boolean;
  creationDate?: Date;
  conclusionDate?: Date;
}

interface ActivityRequest {
  description: string;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  completedActivities: Activity[] = [];
  incompleteActivities: Activity[] = [];
  isSaveButtonDisabled: boolean[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.listAllComplete().subscribe(activities => {
      this.completedActivities = activities;
    });
    this.todoService.listAllIncomplete().subscribe(activities => {
      this.incompleteActivities = activities;
    });
  }
  

  onSubmit(form: NgForm) {
    const newActivity: ActivityRequest = {
      description: form.controls['task'].value || ''
    };
    this.todoService.createActivity(newActivity).subscribe(activity => {
      this.incompleteActivities.push(activity);
      form.reset();
    });
  }

  onDelete(id: number, isCompleted: boolean) {
    this.todoService.deleteActivity(id).subscribe(() => {
      if (isCompleted) {
        this.completedActivities = this.completedActivities.filter(activity => activity.id !== id);
      } else {
        this.incompleteActivities = this.incompleteActivities.filter(activity => activity.id !== id);
      }
    });
  }

  onCheck(id: number, isCompleted: boolean) {
    this.todoService.completeActivity(id).subscribe(updatedActivity => {
      if (isCompleted) {
        this.completedActivities = this.completedActivities.filter(activity => activity.id !== id);
        this.incompleteActivities.push(updatedActivity);
      } else {
        this.incompleteActivities = this.incompleteActivities.filter(activity => activity.id !== id);
        this.completedActivities.push(updatedActivity);
      }
    });
  }

  onEdit(index: number, isCompleted: boolean) {
    if (isCompleted) {
      this.completedActivities[index].isEditable = true;
    } else {
      this.incompleteActivities[index].isEditable = true;
    }
  }

  onSave(id: number, newDescription: string, isCompleted: boolean) {
    const updatedActivity: ActivityRequest = {
      description: newDescription || ''
    };
    this.todoService.updateActivity(id, updatedActivity).subscribe(() => {
      if (isCompleted) {
        const activity = this.completedActivities.find(activity => activity.id === id);
        if (activity) {
          activity.description = newDescription;
          activity.isEditable = false;
        }
      } else {
        const activity = this.incompleteActivities.find(activity => activity.id === id);
        if (activity) {
          activity.description = newDescription;
          activity.isEditable = false;
        }
      }
    });
  }
}