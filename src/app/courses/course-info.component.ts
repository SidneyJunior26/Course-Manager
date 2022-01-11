import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "./course";
import { CourseService } from "./couse.service";

@Component({
    templateUrl: './course-info.component.html'
})

export class CourseInfoComponent implements OnInit {

    courseId: number;

    courseInfo: Course;

    message: boolean = false;
    messageError: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

    ngOnInit(): void {

        this.courseId = +this.activatedRoute.snapshot.paramMap.get('id');

        this.courseService.retrieveById(this.courseId).subscribe({
            next: course => this.courseInfo = course,
            error: err => console.log('Error: ', err)
        });
    }

    save(): void {
        try {
            this.courseService.save(this.courseInfo).subscribe();
            this.message = true;
        }
        catch { this.messageError = true; }
    }

    removeMessage(): void {
        this.message = false;
    }

    removeMessageError(): void {
        this.messageError = false;
    }

}