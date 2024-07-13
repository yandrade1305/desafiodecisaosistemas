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
  activityArray: Activity[] = [];
  isSaveButtonDisabled: boolean[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getActivities().subscribe(activity => {
      this.activityArray = activity;
      this.isSaveButtonDisabled = new Array(activity.length).fill(false);
    });
  }

  onSubmit(form: NgForm) {
    const newActivity: ActivityRequest = {
      description: form.controls['task'].value || ''
    };
    this.todoService.createActivity(newActivity).subscribe(activity => {
      this.activityArray.push(activity);
      this.isSaveButtonDisabled.push(false);
      form.reset();
    });
  }

  onDelete(index: number) {
    const taskId = this.activityArray[index].id;
    if (taskId) {
      this.todoService.deleteActivity(taskId).subscribe(() => {
        this.activityArray.splice(index, 1);
        this.isSaveButtonDisabled.splice(index, 1);
      });
    }
  }

  onCheck(index: number) {
    const activity = this.activityArray[index];
    activity.isCompleted = !activity.isCompleted;
    if (activity.id) {
      this.todoService.completeActivity(activity.id).subscribe();
    }
  }

  onEdit(index: number) {
    this.activityArray[index].isEditable = true;
    this.isSaveButtonDisabled[index] = false;
  }

  onSave(index: number, newDescription: string) {
    const activity = this.activityArray[index];
    if (activity.id) {
      const updatedActivity: ActivityRequest = {
        description: newDescription || ''
      };
      this.todoService.updateActivity(activity.id, updatedActivity).subscribe(() => {
        this.activityArray[index].isEditable = false;
        this.isSaveButtonDisabled[index] = true;
      });
    }
  }
}
