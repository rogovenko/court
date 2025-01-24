import { Accused } from "./accused";
import { Case } from "./case";
import { Jury } from "./jury";
import { Tribunal } from "./tribunal";
import { AccusedMember, JuryMember } from "./types";

export class UI {
    tribunal: Tribunal;
    juries: Jury[];
    accused: Accused;
    case: Case;
    bottom: HTMLElement;
    bottomNext: HTMLElement;
    endingBtn: HTMLElement;
    constructor(tribunal: Tribunal) {
        // LEFT
        this.tribunal = tribunal;
        this.juries = [];
        this.accused = new Accused(document.querySelector('.accused-container') as HTMLElement, this);
        const juryElements = document.querySelectorAll('.jury');
        juryElements.forEach((element, index) => {
            this.juries.push(new Jury(element as HTMLElement, index + 1, this));
        });

        // RIGHT
        this.case = new Case(document.querySelector('.case-container') as HTMLElement);
        this.bottom = document.querySelector('.bottom') as HTMLElement;
        this.bottomNext = document.querySelector('.bottom-next') as HTMLElement;
        this.endingBtn = document.querySelector('.bottom-ending') as HTMLElement;

        document.querySelector('.resume-button')?.addEventListener('click', () => {
            console.log("resume");
            if(this.tribunal.isPause){
                return;
            }
            this.case.toggleCase(false);
            this.cancelAll();
            this.accused.container.classList.add('active');
            this.openResume(true, 0);
        });
        document.querySelector('.case-button')?.addEventListener('click', () => {
            console.log("case");
            if(this.tribunal.isPause){
                return;
            }
            this.cancelAll();
            this.case.toggleCase(true);
            this.case.openCase(this.tribunal.currentCase!);
        });

        document.querySelector('.green-stamp')?.addEventListener('click', () => {
            console.log("green stamp");
            if(this.tribunal.isPause){
                return;
            }
            this.tribunal.changeVerdict(true);
        });

        document.querySelector('.red-stamp')?.addEventListener('click', () => {
            console.log("red stamp");
            if(this.tribunal.isPause){
                return;
            }
            this.tribunal.changeVerdict(false);
        });

        document.querySelector('.hummer')?.addEventListener('click', () => {
            console.log("hummer");
            if(this.tribunal.isPause){
                return;
            }
            this.tribunal.announceVerdict();
        });

        document.querySelector('.next-button')?.addEventListener('click', () => {
            this.tribunal.newProcess();
        });
    }

    openResume(isAccused: boolean, juryNumber: number){
        if(this.tribunal.isPause){
            return;
        }
        if(isAccused){
            this.case.openResume(this.tribunal.currentCase!, true, 0, this.tribunal.caseIterator - 1);
        } else {
            this.case.openResume(this.tribunal.currentCase!, false, juryNumber, this.tribunal.caseIterator - 1);
        }
    }

    openCase(){
        if(this.tribunal.isPause){
            return;
        }
        this.case.openCase(this.tribunal.currentCase!);
    }

    cancelAll(){
        this.juries.forEach(jury => {
            jury.container.classList.remove('active');
        });
        this.accused.container.classList.remove('active');
    }

    updateJuries(juriesData: JuryMember[], caseNumber: number) {
        console.log("HELLO", juriesData);
        juriesData.forEach((jury, index) => {
            this.juries[index].updateJury(jury, caseNumber);
        });
    }

    updateAccused(accusedData: AccusedMember, caseNumber: number) {
        this.accused.updateAccused(accusedData, caseNumber);
    }

    openVerdict(isGuilty: boolean){
        console.log("openVerdict", isGuilty);
        console.log("THIS CASE", this.tribunal.currentCase!);
        this.case.toggleCase(true);
        this.tribunal.isPause = true;
        this.bottom.classList.add('hide');
        if(this.tribunal.caseIterator === 6){
            this.endingBtn.classList.remove('hide');
        }else{
            this.bottomNext.classList.remove('hide');
        }
        if(isGuilty === this.tribunal.currentCase!.isGuilty){
            this.case.verdictChange(true, "")
        }else{
            this.case.verdictChange(false, this.tribunal.currentCase!.failText)
        }
    }
}