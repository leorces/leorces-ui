import type {ProcessDefinition} from "../../../lib/model/definition/ProcessDefinition.ts";
import type {ProcessExecution} from "../../../lib/model/runtime/ProcessExecution.ts";
import type {ActivityDefinition} from "../../../lib/model/definition/ActivityDefinition.ts";
import type {Activity} from "../../../lib/model/runtime/Activity.ts";
import type {ErrorItem} from "../../../lib/model/definition/ErrorItem.ts";

export class BpmnElementSelection {
    processDefinition: ProcessDefinition;
    process?: ProcessExecution;
    selectedActivityDefinition?: ActivityDefinition;
    selectedActivity?: Activity;
    selectedElement?: any;

    constructor(processDefinition: ProcessDefinition, process?: ProcessExecution, selectedElement?: any) {
        this.processDefinition = processDefinition;
        this.process = process;
        this.selectedElement = selectedElement;
        this.selectedActivityDefinition = this.computeSelectedActivityDefinition();
        this.selectedActivity = this.computeSelectedActivity();
    }

    isProcessSelected(): boolean {
        return !this.selectedElement?.id
            || ['bpmn:Process', 'bpmn:Participant', 'bpmn:Collaboration'].includes(this.selectedElement?.$type);
    }

    isExecution(): boolean {
        return !!this.process;
    }

    computeError(errorCode?: string): ErrorItem | undefined {
        return this.processDefinition.errors.find(err => err.errorCode === errorCode);
    }

    private computeSelectedActivityDefinition(): ActivityDefinition | undefined {
        if (this.selectedElement?.id) {
            return this.processDefinition.activities.find(act => act.id === this.selectedElement.id);
        }
    }

    private computeSelectedActivity(): Activity | undefined {
        if (this.selectedElement?.id && this.process) {
            return this.process.activities.find(act => act.definitionId === this.selectedElement.id);
        }
    }
}
