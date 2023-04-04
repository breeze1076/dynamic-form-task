export class FormContent {
    title: string = "";
    formFields: FormField[] = [];
}

export class FormField {
    name: string;
    priority: number;
    fieldType: FieldType;
    mandatory: boolean;
    isMultiline: boolean;
    options: FormFieldOption[];
    dependencies: FormFieldDependency[];
    id: number;

    constructor(values: {
        name?: string;
        priority?: number;
        fieldType?: FieldType;
        mandatory?: boolean;
        isMultiline?: boolean;
        options?: FormFieldOption[];
        dependencies?: FormFieldDependency[];
        id?: number;
    }) {
        this.name = values.name || '';
        this.priority = values.priority || 1;
        this.fieldType = values.fieldType || FieldType.Text;
        this.mandatory = values.mandatory || false;
        this.isMultiline = values.isMultiline || false;
        this.options = values.options || [];
        this.dependencies = values.dependencies || [];
        this.id = values.id || 1;
    }
}

export class FormFieldOption {
    name!: string;
    priority!: number;
    id!: number;
}

export class FormFieldDependency {
    dependencyId!: number;
    dependencyValue!: number | string | boolean;
}

export enum FieldType {
    DropDown = 1,
    Text = 2,
    Checkbox = 3
}
