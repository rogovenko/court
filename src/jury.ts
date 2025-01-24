import { JuryMember } from "./types";
import { UI } from "./ui";

export class Jury {
    container: HTMLElement;
    num: number;
    image: HTMLImageElement;
    ui: UI;
    constructor(container: HTMLElement, num: number, ui: UI) {
        this.container = container;
        this.image = this.container.querySelector('img')!;
        this.num = num;
        this.ui = ui;

        this.container.addEventListener('click', () => {
            if(this.ui.tribunal.isPause){
                return;
            }
            this.ui.cancelAll();
            this.ui.case.toggleCase(false);
            this.container.classList.add('active');
            this.ui.openResume(false, this.num);
        });
    }

    updateJury(jury: JuryMember, caseNumber: number) {
        console.log(`UPDATE JURY`, jury);
        this.image.src = `cases/${caseNumber}/${caseNumber}_${this.num}.png`;
    }
}