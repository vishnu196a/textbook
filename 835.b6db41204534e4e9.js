"use strict";(self.webpackChunkdms=self.webpackChunkdms||[]).push([[835],{9835:(ao,P,a)=>{a.r(P),a.d(P,{AuthenticationModule:()=>c});var l=a(6895),t=a(433),u=a(2545),h=a(727),v=a(8613),o=a(1571),_=a(4410),C=a(7185),w=a(3224);function x(s,e){1&s&&(o.TgZ(0,"small",22),o._uU(1,"Email is required"),o.qZA())}function T(s,e){1&s&&(o.TgZ(0,"small",22),o._uU(1,"Enter a valid email"),o.qZA())}function b(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,x,2,0,"small",21),o.YNc(2,T,2,0,"small",21),o.qZA()),2&s){const n=o.oxw();o.xp6(1),o.Q6J("ngIf",null==n.formControls.email.errors?null:n.formControls.email.errors.required),o.xp6(1),o.Q6J("ngIf",null==n.formControls.email.errors?null:n.formControls.email.errors.pattern)}}function A(s,e){1&s&&(o.TgZ(0,"small",22),o._uU(1,"Password is required"),o.qZA())}function q(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,A,2,0,"small",21),o.qZA()),2&s){const n=o.oxw();o.xp6(1),o.Q6J("ngIf",null==n.formControls.password.errors?null:n.formControls.password.errors.required)}}function J(s,e){if(1&s&&(o.TgZ(0,"li",22),o._uU(1),o.qZA()),2&s){const n=e.$implicit;o.xp6(1),o.hij(" ",n," ")}}function I(s,e){if(1&s&&(o.TgZ(0,"div")(1,"ul",23),o.YNc(2,J,2,1,"li",24),o.qZA()()),2&s){const n=o.oxw();o.xp6(2),o.Q6J("ngForOf",n.errors)}}function S(s,e){1&s&&(o.TgZ(0,"span"),o._uU(1,"Sign in"),o.qZA())}function y(s,e){1&s&&(o.TgZ(0,"span"),o._uU(1,"Signing in"),o.qZA())}function U(s,e){1&s&&o._UZ(0,"c-spinner",25)}class m{constructor(e,n,r,i){this.authenticationService=n,this.toasterService=r,this.router=i,this.subscriptions=new h.w0,this.errors=[],this.isLoading=!1,this.isShowPassword=!0,this.loginForm=e.group({email:[null,[t.kI.required,t.kI.pattern(v.v.email)]],password:[null,t.kI.required]})}get formControls(){return this.loginForm.controls}passwordIconToggle(){this.isShowPassword=!this.isShowPassword}login(){if(this.loginForm.valid){this.isLoading=!0;const n=this.authenticationService.login(this.loginForm.value).subscribe(r=>{this.isLoading=!1,this.router.navigateByUrl("purchase_orders"),this.toasterService.success("Login Successful")},r=>{this.isLoading=!1,this.toasterService.error(r.errors[0])});this.subscriptions.add(n)}}ngOnDestroy(){this.subscriptions.unsubscribe()}}m.\u0275fac=function(e){return new(e||m)(o.Y36(t.qu),o.Y36(_.$),o.Y36(C._W),o.Y36(u.F0))},m.\u0275cmp=o.Xpm({type:m,selectors:[["ng-component"]],decls:30,vars:11,consts:[[1,"d-flex","flex-column","flex-md-row","vh-100","login-cont"],[1,"align-self-center","p-2","p-sm-5","form-cont"],[1,"fw-bold"],[1,"mt-5"],[1,"mt-4","w-75",3,"formGroup","submit"],[1,"mb-2"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email","placeholder","example@example.com","autocomplete","username",1,"form-control"],[4,"ngIf"],[1,"mb-2","mt-4"],["for","password",1,"form-label"],[1,"d-flex"],["id","password","formControlName","password","placeholder","Password","autocomplete","current-password",1,"form-control","input-border-radius",3,"type"],[1,"input-group-append","password-icon"],["aria-hidden","true","data-toggle","tooltip",1,"input-group-text","fa","h-100","d-flex","justify-content-center","align-items-center","icon-border-radius",3,"ngClass","title","click"],[1,"mt-4","d-flex","justify-content-between","align-items-center"],["cButton","","color","primary","type","submit",1,"col-7","col-lg-5",3,"disabled"],["color","info","size","sm",4,"ngIf"],["routerLink","/forgot_password",1,"align-self-center"],[1,"carousel-cont","d-flex","flex-column","justify-content-center","align-items-center"],["src","https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp","alt","login-img",1,"w-75"],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"alert-message-list"],["class","text-danger",4,"ngFor","ngForOf"],["color","info","size","sm"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),o._uU(3,"Text Book Corporation"),o.qZA(),o.TgZ(4,"h3",3),o._uU(5,"Sign in"),o.qZA(),o.TgZ(6,"form",4),o.NdJ("submit",function(){return n.login()}),o.TgZ(7,"div",5)(8,"label",6),o._uU(9,"Email address"),o.qZA(),o._UZ(10,"input",7),o.qZA(),o.YNc(11,b,3,2,"div",8),o.TgZ(12,"div",9)(13,"label",10),o._uU(14,"Password"),o.qZA(),o.TgZ(15,"div",11),o._UZ(16,"input",12),o.TgZ(17,"div",13)(18,"i",14),o.NdJ("click",function(){return n.passwordIconToggle()}),o.qZA()()()(),o.YNc(19,q,2,1,"div",8),o.YNc(20,I,3,1,"div",8),o.TgZ(21,"div",15)(22,"button",16),o.YNc(23,S,2,0,"span",8),o.YNc(24,y,2,0,"span",8),o.YNc(25,U,1,0,"c-spinner",17),o.qZA(),o.TgZ(26,"a",18),o._uU(27,"Forgot Password?"),o.qZA()()()(),o.TgZ(28,"div",19),o._UZ(29,"img",20),o.qZA()()),2&e&&(o.xp6(6),o.Q6J("formGroup",n.loginForm),o.xp6(5),o.Q6J("ngIf",n.formControls.email.touched),o.xp6(5),o.Q6J("type",n.isShowPassword?"password":"text"),o.xp6(2),o.Q6J("ngClass",n.isShowPassword?"fa-eye-slash":"fa-eye")("title",n.isShowPassword?"Show password":"Hide password"),o.xp6(1),o.Q6J("ngIf",n.formControls.password.touched&&n.formControls.password.invalid),o.xp6(1),o.Q6J("ngIf",n.errors),o.xp6(2),o.Q6J("disabled",n.loginForm.invalid||n.isLoading),o.xp6(1),o.Q6J("ngIf",!n.isLoading),o.xp6(1),o.Q6J("ngIf",n.isLoading),o.xp6(1),o.Q6J("ngIf",n.isLoading))},dependencies:[l.mk,l.sg,l.O5,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,u.rH,w.ORR,w.Hq3],styles:[".login-cont[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:40px;font-weight:500}.login-cont[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;border-radius:29px;background-color:#303f9f;border-color:#303f9f;color:#fff;font-size:18px;max-width:150px}.login-cont[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#000;text-decoration:none}.login-cont[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.login-cont[_ngcontent-%COMP%]   .carousel-cont[_ngcontent-%COMP%]{background-color:#e2f1ff}.login-cont[_ngcontent-%COMP%]   .form-cont[_ngcontent-%COMP%]{width:60%;margin-left:4%}.login-cont[_ngcontent-%COMP%]   .carousel-cont[_ngcontent-%COMP%]{width:40%;color:#666666e5}.login-cont[_ngcontent-%COMP%]   .icon-border-radius[_ngcontent-%COMP%]{border-top-left-radius:0;border-bottom-left-radius:0}.login-cont[_ngcontent-%COMP%]   .input-border-radius[_ngcontent-%COMP%]{border-top-right-radius:0;border-bottom-right-radius:0}.login-cont[_ngcontent-%COMP%]   .password-icon[_ngcontent-%COMP%]{cursor:pointer}@media screen and (max-width: 768px){.form-cont[_ngcontent-%COMP%], .carousel-cont[_ngcontent-%COMP%]{min-width:100%}}.alert-message-list[_ngcontent-%COMP%]{list-style-type:none;padding:0}"]});var Z=a(7665);function N(s,e){1&s&&(o.TgZ(0,"small",20),o._uU(1,"Email is required"),o.qZA())}function L(s,e){1&s&&(o.TgZ(0,"small",20),o._uU(1,"Enter a valid email"),o.qZA())}function F(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,N,2,0,"small",19),o.YNc(2,L,2,0,"small",19),o.qZA()),2&s){const n=o.oxw(2);o.xp6(1),o.Q6J("ngIf",null==n.email||null==n.email.errors?null:n.email.errors.required),o.xp6(1),o.Q6J("ngIf",null==n.email||null==n.email.errors?null:n.email.errors.pattern)}}function k(s,e){if(1&s){const n=o.EpF();o.TgZ(0,"div",4)(1,"form",5),o.NdJ("submit",function(){o.CHM(n);const i=o.oxw();return o.KtG(i.onSubmit())}),o.TgZ(2,"h2",6),o._uU(3,"Forgot Password"),o.qZA(),o.TgZ(4,"p",7),o._uU(5," (To receive a temporary password please enter your email address.) "),o.qZA(),o.TgZ(6,"div",8)(7,"div",9)(8,"div",10)(9,"div",11)(10,"span",12),o._UZ(11,"i",13),o.qZA()(),o._UZ(12,"input",14),o.qZA(),o.YNc(13,F,3,2,"div",15),o.qZA()(),o.TgZ(14,"div",16),o._UZ(15,"app-loading-button",17),o.TgZ(16,"a",18),o._uU(17," Go back to Sign in "),o.qZA()()()()}if(2&s){const n=o.oxw();o.xp6(1),o.Q6J("formGroup",n.forgotPasswordForm),o.xp6(12),o.Q6J("ngIf",(null==n.email?null:n.email.touched)&&(null==n.email?null:n.email.invalid)),o.xp6(2),o.Q6J("isLoading",n.isLoading)("disabled",n.forgotPasswordForm.invalid)("loadingText","Generating password")("title","Click to send a temporary password to your email")("buttonIconClass","fas fa-paper-plane")("buttonText",n.lastUsedEmailId===(null==n.email?null:n.email.value)?"Generate Again":"Generate")}}function Y(s,e){if(1&s&&(o.TgZ(0,"div",21)(1,"form",22)(2,"h1",6),o._uU(3,"Thank you"),o.qZA(),o.TgZ(4,"p",7)(5,"span"),o._uU(6,"An email with password reset instructions has been sent to "),o.TgZ(7,"b"),o._uU(8),o.qZA(),o._uU(9,". Didn\u2019t receive the email? Check email address again or look in your spam folder."),o.qZA()(),o.TgZ(10,"div",23)(11,"a",24),o._uU(12," Go back to Login "),o.qZA()()()()),2&s){const n=o.oxw();o.xp6(8),o.Oqu(null==n.email?null:n.email.value)}}class g{constructor(e,n,r){this.formBuilder=e,this.toasterService=n,this.authService=r,this.isPasswordResetLinkSend=!1,this.subscriptions=new h.w0}ngOnInit(){this.forgotPasswordForm=this.formBuilder.group({email:[null,[t.kI.required,t.kI.pattern(v.v.email)]]})}ngOnDestroy(){this.subscriptions.unsubscribe()}get email(){return this.forgotPasswordForm.get("email")}onSubmit(){if(this.forgotPasswordForm.valid){this.isLoading=!0;const n=this.authService.forgotPassword({email:this.email.value}).subscribe(()=>{this.isPasswordResetLinkSend=!0,this.lastUsedEmailId=this.email.value,this.isLoading=!1},r=>{this.toasterService.error(r.errors[0]),this.isLoading=!1,this.isPasswordResetLinkSend=!1});this.subscriptions.add(n)}}}function Q(s,e){return n=>{const r=n.get(s)?.value,i=n.get(e)?.value;return r&&i&&r===i?{changePassword:!0}:null}}function M(s){const e=s.value;if(e){const n=RegExp("[A-Z]").test(e),r=RegExp("[a-z]").test(e),i=RegExp("\\d").test(e),to=RegExp("^[a-zA-Z0-9]*$").test(e),f={password:{value:e,errorMessage:""}};if(n)if(r)if(i){if(!to)return null;f.password.errorMessage="Password should have at least one special characters"}else f.password.errorMessage="Password should have at least one number";else f.password.errorMessage="Password should have at least one lower case letter";else f.password.errorMessage="Password should have at least one upper case letter";return f}return null}function E(s,e){if(1&s&&(o.TgZ(0,"li"),o._uU(1),o.qZA()),2&s){const n=e.$implicit;o.xp6(1),o.hij(" ",n," ")}}function j(s,e){if(1&s&&(o.TgZ(0,"div",26)(1,"p"),o._uU(2,"Please fix the following"),o.qZA(),o.TgZ(3,"ul"),o.YNc(4,E,2,1,"li",27),o.qZA()()),2&s){const n=o.oxw();o.xp6(4),o.Q6J("ngForOf",n.validationErrors)}}function B(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"Current password is required"),o.qZA())}function G(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,B,2,0,"small",19),o.qZA()),2&s){const n=o.oxw();o.xp6(1),o.Q6J("ngIf",null==n.formControls.currentPassword.errors?null:n.formControls.currentPassword.errors.required)}}function R(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"New password is required"),o.qZA())}function z(s,e){if(1&s&&(o.TgZ(0,"small",28),o._uU(1),o.qZA()),2&s){const n=o.oxw(2);o.xp6(1),o.hij(" ",null==n.formControls.newPassword.errors?null:n.formControls.newPassword.errors.password.errorMessage,"")}}function V(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"New password must be 6 characters long"),o.qZA())}function H(s,e){if(1&s&&o.YNc(0,V,2,0,"small",19),2&s){const n=o.oxw(2);o.Q6J("ngIf",null==n.formControls.newPassword.errors?null:n.formControls.newPassword.errors.minlength)}}function $(s,e){if(1&s&&(o.TgZ(0,"div")(1,"small",28),o._uU(2),o.ALo(3,"lowercase"),o.qZA()()),2&s){const n=o.oxw(3);o.xp6(2),o.hij("New ",o.lcZ(3,1,null==n.formControls.newPassword.errors||null==n.formControls.newPassword.errors.password?null:n.formControls.newPassword.errors.password.errorMessage),"")}}function W(s,e){if(1&s&&o.YNc(0,$,4,3,"div",15),2&s){const n=o.oxw(2);o.Q6J("ngIf",null==n.formControls.newPassword.errors?null:n.formControls.newPassword.errors.password)}}function D(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,R,2,0,"small",19),o.YNc(2,z,2,1,"small",29),o.YNc(3,H,1,1,"ng-template",null,30,o.W1O),o.YNc(5,W,1,1,"ng-template",null,31,o.W1O),o.qZA()),2&s){const n=o.MAs(4),r=o.oxw();o.xp6(1),o.Q6J("ngIf",null==r.formControls.newPassword.errors?null:r.formControls.newPassword.errors.required),o.xp6(1),o.Q6J("ngIf",null==r.formControls.newPassword.errors?null:r.formControls.newPassword.errors.password)("ngIfElse",n)}}function X(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"Current password and new password should not be same."),o.qZA())}function K(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"Confirm password is required"),o.qZA())}function oo(s,e){if(1&s&&(o.TgZ(0,"div"),o.YNc(1,K,2,0,"small",19),o.qZA()),2&s){const n=o.oxw();o.xp6(1),o.Q6J("ngIf",null==n.formControls.confirmPassword.errors?null:n.formControls.confirmPassword.errors.required)}}function no(s,e){1&s&&(o.TgZ(0,"small",28),o._uU(1,"New password and confirm password must match."),o.qZA())}g.\u0275fac=function(e){return new(e||g)(o.Y36(t.qu),o.Y36(C._W),o.Y36(_.$))},g.\u0275cmp=o.Xpm({type:g,selectors:[["app-forgot-password"]],decls:4,vars:2,consts:[[1,"d-flex","justify-content-center","align-items-center","card-cont"],[1,"card","p-4","shadow","mx-auto","w-50","mt-5","gradient-custom"],["class","card-body face back",4,"ngIf"],["class","card-body face front",4,"ngIf"],[1,"card-body","face","back"],["autocomplete","off",1,"form-horizontal",3,"formGroup","submit"],[1,"text-center","font-weight-bold"],[1,"text-center"],[1,"form-group"],[1,"controls"],[1,"input-prepend","input-group"],[1,"input-group-prepend"],[1,"input-group-text","mail-icon","h-100"],[1,"fa","fa-envelope"],["type","email","id","email","formControlName","email","placeholder","Email","autocomplete","username",1,"form-control"],[4,"ngIf"],[1,"d-flex","justify-content-between","mt-4"],[3,"isLoading","disabled","loadingText","title","buttonIconClass","buttonText"],["title","Go back to sign in page","routerLink","../login",1,"mt-2"],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"card-body","face","front"],[1,"form-horizontal"],[1,"row"],["title","Go back to login page","routerLink","../login",1,"mt-2","mx-auto"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0)(1,"div",1),o.YNc(2,k,18,8,"div",2),o.YNc(3,Y,13,1,"div",3),o.qZA()()),2&e&&(o.xp6(2),o.Q6J("ngIf",!n.isPasswordResetLinkSend),o.xp6(1),o.Q6J("ngIf",n.isPasswordResetLinkSend))},dependencies:[l.O5,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,u.rH,t.F,Z.v],styles:[".mail-icon[_ngcontent-%COMP%]{border-top-right-radius:0;border-bottom-right-radius:0}.card-cont[_ngcontent-%COMP%]{height:90vh}"]});class p{constructor(e,n,r,i){this.formBuilder=e,this.toasterService=n,this.authService=r,this.location=i,this.isShowCurrentPassword=!1,this.isShowNewPassword=!1,this.isShowConfirmPassword=!1,this.subscriptions=new h.w0,this.isLoading=!1,this.hasValidationError=!1}ngOnInit(){this.changePwdForm=this.formBuilder.group({currentPassword:["",[t.kI.required]],newPassword:["",[t.kI.required,t.kI.minLength(6),M.bind(this)]],confirmPassword:["",t.kI.required]},{validators:[("newPassword","confirmPassword",n=>{const r=n.get("newPassword")?.value,i=n.get("confirmPassword")?.value;return r&&i&&r===i?null:{mismatch:!0}}),Q("currentPassword","newPassword")]})}ngOnDestroy(){this.subscriptions.unsubscribe()}changeCurrentPasswordInput(){this.isShowCurrentPassword=!this.isShowCurrentPassword}changeNewPasswordInput(){this.isShowNewPassword=!this.isShowNewPassword}changeConfirmPasswordInput(){this.isShowConfirmPassword=!this.isShowConfirmPassword}get formControls(){return this.changePwdForm.controls}onChangePwd(){if(this.changePwdForm.valid){this.isLoading=!0,this.hasValidationError=!1;const n=this.authService.changePassword({current_password:this.changePwdForm.value.currentPassword,new_password:this.changePwdForm.value.newPassword,confirm_password:this.changePwdForm.value.confirmPassword}).subscribe(()=>{this.isLoading=!1,this.onLogOut(),this.toasterService.success("Password has been changed successfully. Login with new credentials")},r=>{this.isLoading=!1,this.toasterService.error(r.errors[0])});this.subscriptions.add(n)}}onLogOut(){const e=this.authService.logout().subscribe(()=>{this.toasterService.success("You have been logged out successfully")});this.subscriptions.add(e)}onBack(){this.location.back()}}p.\u0275fac=function(e){return new(e||p)(o.Y36(t.qu),o.Y36(C._W),o.Y36(_.$),o.Y36(l.Ye))},p.\u0275cmp=o.Xpm({type:p,selectors:[["ng-component"]],decls:45,vars:22,consts:[[1,"card-cont","d-flex","justify-content-center","align-items-center"],[1,"card","col-12","col-sm-10","col-md-8","col-lg-6","p-3","mt-5"],[1,"text-center"],["class","alert alert-warning mt-1",4,"ngIf"],[1,"car"],[1,"card-body"],["autocomplete","off",3,"formGroup","submit"],[1,"form-group"],["for","currentPassword"],[1,"input-group","mt-2"],[1,"input-group-text"],[1,"fa","fa-lock"],["id","currentPassword","placeholder","Enter Current Password","formControlName","currentPassword","autocomplete","current-password",1,"form-control",3,"type"],["aria-hidden","true","data-toggle","tooltip",1,"input-group-text",3,"title","click"],[3,"ngClass"],[4,"ngIf"],[1,"form-group","mt-3"],["for","newPassword"],["id","newPassword","placeholder","Enter New Password","formControlName","newPassword","autocomplete","new-password",1,"form-control",3,"type"],["class","text-danger",4,"ngIf"],["for","confirmPassword"],["id","confirmPassword","placeholder","Enter Confirm Password","formControlName","confirmPassword","autocomplete","new-password",1,"form-control",3,"type"],[1,"form-group","d-flex"],[1,"d-flex","float-right"],[1,"mb-3","mt-3",3,"disabled","isLoading","title","buttonText","loadingText","buttonIconClass"],["title","Click to go back",1,"ms-auto","btn","btn-primary","align-self-center",3,"click"],[1,"alert","alert-warning","mt-1"],[4,"ngFor","ngForOf"],[1,"text-danger"],["class","text-danger",4,"ngIf","ngIfElse"],["characterLengthCheck",""],["passwordError",""]],template:function(e,n){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"h3",2),o._uU(3,"Change Password"),o.qZA(),o.YNc(4,j,5,1,"div",3),o.TgZ(5,"div",4)(6,"div",5)(7,"form",6),o.NdJ("submit",function(){return n.onChangePwd()}),o.TgZ(8,"div",7)(9,"label",8),o._uU(10,"Current Password"),o.qZA(),o.TgZ(11,"div",9)(12,"span",10),o._UZ(13,"i",11),o.qZA(),o._UZ(14,"input",12),o.TgZ(15,"span",13),o.NdJ("click",function(){return n.changeCurrentPasswordInput()}),o._UZ(16,"i",14),o.qZA()(),o.YNc(17,G,2,1,"div",15),o.qZA(),o.TgZ(18,"div",16)(19,"label",17),o._uU(20,"New Password"),o.qZA(),o.TgZ(21,"div",9)(22,"span",10),o._UZ(23,"i",11),o.qZA(),o._UZ(24,"input",18),o.TgZ(25,"span",13),o.NdJ("click",function(){return n.changeNewPasswordInput()}),o._UZ(26,"i",14),o.qZA()(),o.YNc(27,D,7,3,"div",15),o.YNc(28,X,2,0,"small",19),o.qZA(),o.TgZ(29,"div",16)(30,"label",20),o._uU(31,"Confirm Password"),o.qZA(),o.TgZ(32,"div",9)(33,"span",10),o._UZ(34,"i",11),o.qZA(),o._UZ(35,"input",21),o.TgZ(36,"span",13),o.NdJ("click",function(){return n.changeConfirmPasswordInput()}),o._UZ(37,"i",14),o.qZA()(),o.YNc(38,oo,2,1,"div",15),o.YNc(39,no,2,0,"small",19),o.qZA(),o.TgZ(40,"div",22)(41,"div",23),o._UZ(42,"app-loading-button",24),o.qZA(),o.TgZ(43,"button",25),o.NdJ("click",function(){return n.onBack()}),o._uU(44," Back "),o.qZA()()()()()()()),2&e&&(o.xp6(4),o.Q6J("ngIf",n.hasValidationError),o.xp6(3),o.Q6J("formGroup",n.changePwdForm),o.xp6(7),o.Q6J("type",n.isShowCurrentPassword?"text":"password"),o.xp6(1),o.Q6J("title",n.isShowCurrentPassword?"Show password":"Hide Password"),o.xp6(1),o.Q6J("ngClass",n.isShowCurrentPassword?"fa fa-eye":"fa fa-eye-slash"),o.xp6(1),o.Q6J("ngIf",n.formControls.currentPassword.touched&&n.formControls.currentPassword.invalid),o.xp6(7),o.Q6J("type",n.isShowNewPassword?"text":"password"),o.xp6(1),o.Q6J("title",n.isShowCurrentPassword?"Show password":"Hide Password"),o.xp6(1),o.Q6J("ngClass",n.isShowCurrentPassword?"fa fa-eye":"fa fa-eye-slash"),o.xp6(1),o.Q6J("ngIf",n.formControls.newPassword.touched&&n.formControls.newPassword.invalid),o.xp6(1),o.Q6J("ngIf",n.formControls.newPassword.valid&&n.formControls.newPassword.value&&(null==n.changePwdForm.errors?null:n.changePwdForm.errors.changePassword)),o.xp6(7),o.Q6J("type",n.isShowConfirmPassword?"text":"password"),o.xp6(1),o.Q6J("title",n.isShowCurrentPassword?"Show password":"Hide Password"),o.xp6(1),o.Q6J("ngClass",n.isShowCurrentPassword?"fa fa-eye":"fa fa-eye-slash"),o.xp6(1),o.Q6J("ngIf",n.formControls.confirmPassword.touched&&n.formControls.confirmPassword.invalid),o.xp6(1),o.Q6J("ngIf",n.formControls.confirmPassword.value&&(null==n.changePwdForm.errors?null:n.changePwdForm.errors.mismatch)),o.xp6(3),o.Q6J("disabled",n.changePwdForm.invalid)("isLoading",n.isLoading)("title","Click to change password")("buttonText","Change")("loadingText","Updating...")("buttonIconClass","fas fa-check"))},dependencies:[l.mk,l.sg,l.O5,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,Z.v,l.i8]});var so=a(830);const eo=[{path:"login",component:m},{path:"forgot_password",component:g},{path:"",component:so.e,children:[{path:"change_password",component:p}]}];class d{}d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=o.oAB({type:d}),d.\u0275inj=o.cJS({imports:[u.Bz.forChild(eo),u.Bz]});var ro=a(4466);class c{}c.\u0275fac=function(e){return new(e||c)},c.\u0275mod=o.oAB({type:c}),c.\u0275inj=o.cJS({imports:[l.ez,t.UX,d,w.Fme,w.hJ1,ro.m]})}}]);