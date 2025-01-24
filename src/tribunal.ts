import { CourtCase } from "./types";
import { UI } from "./ui";

const MAX_CASES = 10;

export class Tribunal {
  private ui: UI = new UI(this);
  private currentVerdict: number = 0;
  public caseIterator: number;
  public currentCase: CourtCase | null = null;
  public isPause: boolean = false;

  constructor() {
    this.caseIterator = 1;
    this.newProcess(); // запускаем новый процесс
  }

  public async newProcess() {
    if (this.caseIterator > MAX_CASES) {
      console.log("Конец игры. Вы всех рассудили!");
      return;
    }

    this.currentCase = await this.loadCase(`cases/${this.caseIterator}/case.json`);
    console.log(this.currentCase);
    this.ui.updateJuries(this.currentCase.jury, this.caseIterator);
    this.ui.updateAccused(this.currentCase.accused, this.caseIterator);

    this.ui.bottom.classList.remove('hide');
    this.ui.bottomNext.classList.add('hide');
    this.caseIterator++; // прибавляем итератор дела
    // this.ui.case.toggleCase(true);
    this.ui.case.openCase(this.currentCase);
    this.isPause = false;
  }

  private async loadCase(path: string): Promise<CourtCase> {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.status} ${response.statusText}`);
        }
        const data: CourtCase = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке дела:", error);
        throw error;
    }
  }

  public changeVerdict(isGuilty: boolean) {
    if(isGuilty){
        this.currentVerdict = 2;
    }else{
        this.currentVerdict = 1;
    }
  }

  public announceVerdict() {
    if(this.currentVerdict === 0) return
    // TODO: запуск анимации молотка и отображение экрана конца заседания
    if(this.currentVerdict === 1){
      console.log(`Вынесен приговор: Виновен`);
        this.ui.openVerdict(true);
    }else{
        console.log(`Вынесен приговор: Невиновен`);
        this.ui.openVerdict(false);
    }
  }
}
