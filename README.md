# LenderMaintenance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Major Functionalities

1.  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. In dev mode, you will be able to see the lender maintainance page like below. To simulate the time to fetch the data, there would be a loading spinner when the page is shown the first time. After 3 seconds, the loading completes and you should be able to see the sample lender data in the table with a green success toast message on the top right corner.

    Data loading:

    <img src="https://drive.google.com/uc?id=1qEqXTyQMFO_dnyKeb-ZbfeQvLVZZLAlr" alt="data loading image" style="width: 50%; border: 1px solid #ccc;" />

    Data loaded successfully:

    <img src="https://drive.google.com/uc?id=1PJHzBmJ1UoUmJ75rJsd01Q6QMBYJNPfB" alt="data loaded successfully image" style="width: 50%; border: 1px solid #ccc;" />

2.  On lenders maintanance page, you could scroll up and down to check for all details of all sample lenders data. Please notice that the page is responsive, so there would be a horizontal scrollbar if you view the page on a smaller screen.

    Lenders table on smaller screen:

    <img src="https://drive.google.com/uc?id=1LgaL8LqAAOIAriX66PP53EoJwW9zCQQK" alt="lenders table on smaller screen image" style="width: 50%; border: 1px solid #ccc;" />

3.  When you try to edit one of the lenders, please click on the "Edit" button that is the rightmost column. Then you would be navigated to the lender edit page where you could edit any field. Please notice that the changes made by you would be checked against the original one. You would be navigated back to lenders maintainance table if you click "Save" button to save the changes. Same thing happens when no change is made by clicking on the "Cancel" button. However, if there is any change and you click "Cancel", there would be a confirm modal telling you that changes are not saved and would be lost if you click "Yes" to proceed. Last but not least, the modal is close when you click "No" inside the modal where you could continue to do your changes.

    Lender updated before:

    <img src="https://drive.google.com/uc?id=1lhIzxtXNqP6p3_xUTR_rT2ugJ9RdJtch" alt="lender updated before image" style="width: 50%; border: 1px solid #ccc;" />

    Lender updated after:

    <img src="https://drive.google.com/uc?id=1PWCDOYO3kS37bOByE7_HRIIiKUdRbzSF" alt="lender updated after image" style="width: 50%; border: 1px solid #ccc;" />

    Confirm modal:

    <img src="https://drive.google.com/uc?id=13hgCouyNS477gpRHybZgYlRLbZ9BxyuF" alt="confirm modal image" style="width: 50%; border: 1px solid #ccc;" />

4.  To simulate an error occurs, I have added an environment call "error". To run
    the application in "error" mode, simply run the command `ng serve --configuration=error`. In this mode, you would see a sample error message on the top right corner as well as a "Retry" button on the page. Simply click on the "Retry" button and the sample lender JSON data would be loaded again after 3 seconds.

    Data loaded with error:

    <img src="https://drive.google.com/uc?id=10H8G2qerzTC4vLITgSxxUpmzNqYOfS_v" alt="data loaded with error image" style="width: 50%; border: 1px solid #ccc;" />

    Data loaded successfully after clicking "Retry":

    <img src="https://drive.google.com/uc?id=1PJHzBmJ1UoUmJ75rJsd01Q6QMBYJNPfB" alt="data loaded successfully after clicking retry image" style="width: 50%; border: 1px solid #ccc;" />

## Important Project Folders

### Components (../src/app/components)

1. LenderMaintenanceComponent: This is the component to load and show the lenders in a table using the data in the sample lender json file which is under "../src/assets".
2. LenderComponent: This is the component to edit a single lender, which could be navigated by clicking on the "Edit" button for any lender on the lenders maintainance table. Please notice that the changes could be lost if not saved. When that happens, there would be a confirm modal that gives the user such warning.
3. LoadingSpinnerComponent: This is the component to show a loading spinner on the lenders maintainance page when the data is still loading.
4. ConfirmModalComponent: This is the component to show a warning message when the user makes changes on a lender and click "Cancel" button instead of "Save" button.

### Enums (../src/app/enums)

1. BankProperties: This is the enum for the bank properties changes. Since I assume that each bank code and display name should be in a one-to-one relationship, I have some built-in functionalities which allows the bank dropdown to be updated accordingly when the user changes either bank code or bank display name. For examples, let's assume that the original bank code is "DOM" and display name is "Domain". If the user changes the bank code to "CUA", then the display name would be changed to "Credit Union Australia". Similarly, if the user changes the bank name to "Credit Union Australia", then the bank code would be changed to "CUA".

### Guards (../src/app/guards)

1. AuthGuardService: This is a simple guard that checks whether both banks and lender types are being populated after the lenders are loaded. If not, then this guard would navigate the user back to the lenders maintainance page. This happens when the user tries to go to the lender edit page by placing the URL directly on the browser. If that happens, both the bank code and display name dropdown would be empty. So I force the user to be navigated here only by clicking on the "Edit" button on the lenders maintainance table.

### Models (../src/app/models)

1. IBank: This is a bank model which would be used frequently, especially on the lender edit page.
2. ILenderAttributes: This is a model to be used as the attributes of a ILender model.
3. ILenderJsonResult: This is a model to be used as the returned type of the sample lenders JSON data.
4. ILender: This is a model that listed all the properties of a lender, which contains a ILenderAttributes model.

### Pipes (../src/app/pipes)

1. EllipsisPipe: This is a custom pipe that shortens a long string with ellipsis. It is used in the "Display Name" column of the lenders maintainance table to keep the display name in a single line if it is too long. By default, the pipe works if the display name is more than 20 characters, which could be changed.

### Services (../src/app/services)

1. LenderService: This is the service to load the sample lenders JSON data and share such data with BehaviorSubject. In addition, it offers a function to update the lenders if one of them is changed and changes are saved. Last but not least, it also keeps track of the current selected lender if the user clicks on the "Edit" button of one of the lenders in the table.
2. ErrorHandleService: This is the error handling service which broadcasts an error message and shows a toast error message if any error occurs.
3. InterceptorService: This is a special service that checks whether any error occurs between the client-side and server-side outgoing/incoming HTTP request and response. It uses the ErrorHandleService to handle the error.

### Assets (../src/assets)

1. lenders.json: This is the JSON file with sample lenders data.

### Environments (../src/environments)

1. environment.development.ts: This is the file that lists the environment variables used in development environment.
2. environment.error.ts: This is the file that lists the environment variables used in error environment, which is only used to simulate that an unknown error occurs while loading data.
3. environment.ts: This is the file that lists the environment variables used in production environment.

If the user clicks "No" on the modal, then the modal closes. However, if the user clicks "Yes" on the modal, then all changes would be lost and the user would be navigated back to lenders maintainance table.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
