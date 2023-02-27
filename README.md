# LenderMaintenance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## How to use the app

1. Please clone the repo and run `npm install` to install all packages.

2. Please execute `ng serve` to launch the app in development mode and navigate to 'http://localhost:4200/'. The application will automatically reload if you change any of the source files.

   In this environment, you will see the lender maintenance page with a header and a loading spinner that indicates that sample lenders are being loaded. The loading spinner should disappear after 3 seconds, and you should see all lenders in the table with a green success toast message in the top right corner.

   Data loading:

   <img src="https://drive.google.com/uc?id=1qEqXTyQMFO_dnyKeb-ZbfeQvLVZZLAlr" alt="data loading image" style="width: 50%;" />

   Data loaded successfully:

   <img src="https://drive.google.com/uc?id=1PJHzBmJ1UoUmJ75rJsd01Q6QMBYJNPfB" alt="data loaded successfully image" style="width: 50%;" />

3. You could check for all lenders by scrolling up and down on the lenders' maintenance page. Notice that the column headings stay on the screen when you are scrolling up and down the table. In addition, since this page was designed with responsiveness in mind in the first place, there will be a horizontal scrollbar if you view the page on a smaller screen (e.g., a tablet or mobile).

   Lenders table on smaller screen:

   <img src="https://drive.google.com/uc?id=1LgaL8LqAAOIAriX66PP53EoJwW9zCQQK" alt="lenders table on smaller screen image" style="width: 50%;" />

4. When you try to edit one of the lenders, please click on the "Edit" button that is in the rightmost column of the lender. Then you would be navigated to the lender edit page, where you could edit any field.

   Please keep in mind that the changes you make will be compared to the original. You would be navigated back to the lenders table if you clicked the "Save" button to save the changes. The same thing happens when no change is made and you click on the "Cancel" button.

   However, if there is any change and you click on the "Cancel" button, there would be a confirmation modal telling you that changes are not saved and would be lost, with "Yes" and "No" buttons, asking whether you want to proceed. All changes will be lost if you click the "Yes" button, and you will be returned to the lenders table. If you click on the "No" button, then the modal will close and you can continue to edit the lender.

   Lender updated before:

   <img src="https://drive.google.com/uc?id=1lhIzxtXNqP6p3_xUTR_rT2ugJ9RdJtch" alt="lender updated before image" style="width: 50%;" />

   Lender updated after:

   <img src="https://drive.google.com/uc?id=1PWCDOYO3kS37bOByE7_HRIIiKUdRbzSF" alt="lender updated after image" style="width: 50%;" />

   Confirm modal:

   <img src="https://drive.google.com/uc?id=13hgCouyNS477gpRHybZgYlRLbZ9BxyuF" alt="confirm modal image" style="width: 50%;" />

   Lenders table after updating the lender:

   <img src="https://drive.google.com/uc?id=132_een1VOvG7NOg1ZHSRGQJUCtj260TK" alt="lenders table after updating the lender image" style="width: 50%;" />

5. To simulate an error occuring, I have added an environment called "error". To run the application in this environment, simply run `ng serve --configuration=error`. After the app starts in this environment, you will see a toast error message in the top right corner as well as a "Retry" button. To load the data again, simply click on the "Retry" button, and the data will be loaded successfully after 3 seconds.

   Data loaded with error:

   <img src="https://drive.google.com/uc?id=10H8G2qerzTC4vLITgSxxUpmzNqYOfS_v" alt="data loaded with error image" style="width: 50%;" />

   Data loaded successfully after clicking "Retry":

   <img src="https://drive.google.com/uc?id=1PJHzBmJ1UoUmJ75rJsd01Q6QMBYJNPfB" alt="data loaded successfully after clicking retry image" style="width: 50%;" />

## Important Project Folders

### Components (../src/app/components)

1. LenderMaintenanceComponent: This is the component to load and show the lenders in a table using the data in the sample lender json file, which is under "../src/assets".

2. LenderComponent: This is the component to edit a single lender, which could be navigated by clicking on the "Edit" button for any lender on the lenders table. Please notice that the changes could be lost if not saved. When that happens, there will be a confirmation modal that gives the user a warning.

3. LoadingSpinnerComponent: This is the component that shows a loading spinner on the lenders maintainance page when the data is still loading.

4. ConfirmModalComponent: This is the component that shows a warning message when the user makes changes to a lender and clicks the "Cancel" button instead of the "Save" button.

### Enums (../src/app/enums)

1. BankProperties: This is the enum for the bank property changes. Since I assume that each bank code and display name should be in a one-to-one relationship, I have a function that allows the related bank dropdowns to be updated accordingly when the user changes either the bank code or the bank display name.

   For examples, let's assume that the original bank code is "DOM" and the display name is "Domain". If the user changes the bank code to "CUA", then the display name will be changed to "Credit Union Australia" automatically. Similarly, if the user changes the bank name to "Credit Union Australia", then the bank code will be changed to "CUA".

### Guards (../src/app/guards)

1. AuthGuardService: This is a simple guard that checks whether both banks and lender types are being populated after the lenders are loaded. If not, then this guard will navigate the user back to the lenders table.

   This happens when the user tries to go to the lender edit page by placing the URL directly in the browser. If that happens, both the bank code and display name dropdowns will be empty. Therefore, the user can only navigate to the lender edit page by clicking on the "Edit" button of the lender in the lenders table.

### Models (../src/app/models)

1. IBank: This is a bank model that is used almost everywhere, especially on the lender edit page.

2. ILenderAttributes: This is a model listing all attributes that are used in an ILender model.

3. ILenderJsonResult: This is a model used as the returned type of the sample lenders data.

4. ILender: This is a model that lists all of a lender's properties.

### Pipes (../src/app/pipes)

1. EllipsisPipe: This is a custom pipe that shortens a long string with ellipses. It is used in the "Display Name" column of the lenders table to keep the display name on a single line if it is too long. By default, the pipe will kick in if the display name is more than 20 characters, which can be customised.

### Services (../src/app/services)

1. LenderService: This service is used to load sample lender data and share it with BehaviorSubject. In addition, it offers a way to update the lenders and broadcast the updated lenders if one of them is changed and the changes are saved. Also, the service can return all banks and lender types based on the loaded data. Last but not least, it also keeps track of the current selected lender if the user clicks on the "Edit" button of one of the lenders in the table.

2. ErrorHandleService: This is the error handling service that broadcasts an error message and shows a toast error message if any error occurs.

3. InterceptorService: This is a service that checks whether there is any error between the client-side and server-side outgoing and incoming HTTP requests and responses. It uses the ErrorHandleService to handle the error.

### Assets (../src/assets)

1. lenders.json: This is the JSON file with sample lenders data.

### Environments (../src/environments)

1. environment.development.ts: This is the file that lists the environment variables used in development environment.

2. environment.error.ts: This is the file that lists the environment variables used in the error environment, which is to simulate that an error occurs while loading data.

3. environment.ts: This is the file that lists the environment variables used in the production environment.

## Important third-party libraries

1. Bootstrap: A powerful, extensible, and feature-packed frontend toolkit. Build and customise with Sass, utilise prebuilt grid systems and components, and bring projects to life with powerful JavaScript plugins. (https://getbootstrap.com/)
2. Font Awesome: A popular icon library and toolkit, used by millions of designers, developers, and content creators. (https://fontawesome.com/)
3. Lodash: A modern JavaScript utility library delivering modularity, performance, and extras. (https://lodash.com/)
4. ngx-toastr: A node package that helps developers use toast messages in their apps with different versions of Angular. (https://www.npmjs.com/package/ngx-toastr)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
