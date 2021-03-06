jest.mock("@angular/router");
jest.mock("app/core/auth/account.service");

import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  inject,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";

import { UserManagementService } from "../service/user-management.service";
import { User } from "../user-management.model";
import { AccountService } from "app/core/auth/account.service";

import { UserManagementComponent } from "./user-management.component";

describe("Component Tests", () => {
  describe("User Management Component", () => {
    let comp: UserManagementComponent;
    let fixture: ComponentFixture<UserManagementComponent>;
    let service: UserManagementService;
    let mockAccountService: AccountService;
    const data = of({
      defaultSort: "id,asc",
    });
    const queryParamMap = of(
      jest.requireActual("@angular/router").convertToParamMap({
        page: "1",
        size: "1",
        sort: "id,desc",
      })
    );

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [UserManagementComponent],
          providers: [
            Router,
            { provide: ActivatedRoute, useValue: { data, queryParamMap } },
            AccountService,
          ],
        })
          .overrideTemplate(UserManagementComponent, "")
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserManagementComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(UserManagementService);
      mockAccountService = TestBed.inject(AccountService);
      mockAccountService.identity = jest.fn(() => of(null));
    });

    describe("OnInit", () => {
      it("Should call load all on init", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const headers = new HttpHeaders().append("link", "link;link");
          spyOn(service, "query").and.returnValue(
            of(
              new HttpResponse({
                body: [new User("ABC")],
                headers,
              })
            )
          );

          // WHEN
          comp.ngOnInit();
          tick(); // simulate async

          // THEN
          expect(service.query).toHaveBeenCalled();
          expect(comp.users?.[0]).toEqual(
            jasmine.objectContaining({ id: "ABC" })
          );
        })
      ));
    });

    describe("setActive", () => {
      it("Should update user and call load all", inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const headers = new HttpHeaders().append("link", "link;link");
          const user = new User("ABC");
          spyOn(service, "query").and.returnValue(
            of(
              new HttpResponse({
                body: [user],
                headers,
              })
            )
          );
          spyOn(service, "update").and.returnValue(
            of(new HttpResponse({ status: 200 }))
          );

          // WHEN
          comp.setActive(user, true);
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith({
            ...user,
            activated: true,
          });
          expect(service.query).toHaveBeenCalled();
          expect(comp.users?.[0]).toEqual(
            jasmine.objectContaining({ id: "ABC" })
          );
        })
      ));
    });
  });
});
