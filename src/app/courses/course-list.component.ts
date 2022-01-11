import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "./course";
import { CourseService } from "./couse.service";

@Component({
    templateUrl: './couse-list.component.html'
})
export class CourseListComponent implements OnInit {

    message: boolean = false;
    messageError: boolean = false;
    messageConfirmation: boolean = false;

    courseId: number;
    courseName: string;

    filteredCourses: Course[] = [];

    _courses: Course[] = [];

    _filterBy: string;

    constructor(private courseService: CourseService, private router: Router) {

    }

    ngOnInit(): void {
        this.retrieveAll();
    }

    retrieveAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('Error: ', err)
        });
    }

    deleteById(): void {
        try {
            this.messageConfirmation = false;
            this.courseService.deleteById(this.courseId).subscribe({
                next: () => {
                    this.retrieveAll();
                },
                error: err => console.log('Error: ', err)
            });
            this.message = true;
        } catch { this.messageError = true; }
    }

    set filter(value: string) {
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLowerCase().indexOf(this._filterBy.toLowerCase()) > -1);
    }

    get filter() {
        return this._filterBy;
    }

    removeMessage(): void {
        this.message = false;
    }

    removeMessageError(): void {
        this.messageError = false;
    }

    confirmation(value: boolean, id: number, name: string): void {
        this.messageConfirmation = value;
        this.courseId = id;
        this.courseName = name;
    }
}