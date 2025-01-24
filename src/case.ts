export class Case {
    container: HTMLElement;
    resume: HTMLElement;
    photo: HTMLImageElement;
    name: HTMLDivElement;
    info: HTMLDivElement;
    casePaper: HTMLElement;
    title: HTMLDivElement;
    description: HTMLDivElement;
    constructor(container: HTMLElement) {
        this.container = container;
        this.resume = this.container.querySelector('.resume') as HTMLElement;
        this.casePaper = this.container.querySelector('.case-paper') as HTMLElement;

        this.photo = this.resume.querySelector('#photo') as HTMLImageElement;
        this.name = this.resume.querySelector('#name') as HTMLDivElement;
        this.info = this.resume.querySelector('#info') as HTMLDivElement;

        this.title = this.casePaper.querySelector('#title') as HTMLDivElement;
        this.description = this.casePaper.querySelector('#case-content') as HTMLDivElement;
    }

    toggleCase(isCase: boolean){
        if(isCase){ 
            this.casePaper.classList.add('show');
            this.resume.classList.remove('show');
        }else{
            this.resume.classList.add('show');
            this.casePaper.classList.remove('show');
        }
    }

    openResume(data: any, isAccused: boolean, num: number, caseNumber: number){
        console.log("DATA", data, isAccused, num);
        if(isAccused){
            this.name.innerHTML = data.accused.name;
            this.info.innerHTML = data.accused.description;
            this.photo.src = `cases/${caseNumber}/${caseNumber}_0_idle.png`;
        }else{
            this.name.innerHTML = data.jury[num - 1].name;
            this.info.innerHTML = data.jury[num - 1].description;
            this.photo.src = `cases/${caseNumber}/${caseNumber}_${num}.png`;
        }
    }

    openCase(data: any){
        this.title.innerHTML = data.accused.case.title;
        this.description.innerHTML = data.accused.case.description;
    }

    verdictChange(isGuilty: boolean, text: string){
        this.title.innerHTML = isGuilty ? "Приговор вынесен ВЕРНО!" : "Приговор вынесен ЛОЖНО";
        if(isGuilty){
            this.description.innerHTML = "Вы потрясающий судья, продолжайте в том же духе!";
        }else{
            this.description.innerHTML = text;
        }
    }
}