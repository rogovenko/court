import { AccusedMember } from "./types";
import { UI } from "./ui";

export class Accused {
    container: HTMLElement;
    image: HTMLImageElement;
    ui: UI;
    constructor(container: HTMLElement, ui: UI) {
        this.container = container;
        this.image = this.container.querySelector('img')!;
        this.ui = ui;

        this.container.addEventListener('click', () => {
            if(this.ui.tribunal.isPause){
                return;
            }
            this.ui.cancelAll();
            this.container.classList.add('active');
            this.ui.case.toggleCase(false);
            this.ui.openResume(true, 0);
        });
    }

    updateAccused(accusedData: AccusedMember, caseNumber: number) {
        console.log(`ACCUSED`, accusedData);
        this.image.src = `cases/${caseNumber}/${caseNumber}_0_idle.gif`;
    }
}