speechnav
=========

Integration with web speech api for web browsing



=========
Vocal comands to implement for the next first release:

- Again
Repeat last command executed (if possible).

- Click on <anyword>
This command search inside body any link with text <anyword> and simulate the click on the first of them.

- Enable <anyword>
This command search inside body any element with text <anyword> and simulate the hover on the first of them.

- Go to <anyword>
This command search inside body any link with text <anyword> and simulate the click on the first of them.

- Show Next
This command go foward on a gallery by simulating click on element with id "next".
It's repeatable. 

- Show Previous
This command go back on a gallery by simulating click on element with id "previous".
It's repeatable.

- Show Zoom
This command enable zoom by simulating click on element with id "zoom" (if exist).
Usually on a product or gallery page.
It's stoppable, basically by simulating the "esc" button.

- Search <anyword>
This command enables input text with id "search" (if exist), fill it with <anyword> and sumbit form.

- Scroll Down
This command scrolls down page to little less of window height size.
It's repeatable. It's stoppable.

- Scroll Up
This command scrolls up to to little less of window height size.
It's repeatable. It's stoppable.

- Scroll Left
This command scrolls to left to little less of window width size.
It's repeatable. It's stoppable.

- Scroll Left
This command scrolls to right to little less of window width size.
It's repeatable. It's stoppable.

- Stop
This command stops execution of current command executing (if possible).
=========