import { EuiComboBoxOptionOption } from "@elastic/eui";

export default function UseOlympiadsLabelValuePair() {
    return [
        {
            label: 'Olimpiada Wiedzy Ekonomicznej',
            value: 'OWE',
            color: '#019642'
        },
        {
            label: 'Olimpiada Przedsiębiorczości',
            value: 'OP',
            color: '#004a8e'
        },
        {
            label: 'Olimpiada Matematyczna',
            value: 'OM',
            color: '#34343c'
        },
        {
            label: 'Olimpiada Informatyczna',
            value: 'OI',
            color: '#0994dc'
        },
        {
            label: 'Olimpiada Fizyczna',
            value: 'OFIZ',
            color: '#dfdfdf'
        },
        {
            label: 'Olimpiada Chemiczna',
            value: 'OLCHEM',
            color: '#fbb040'
        },
        {
            label: 'Olimpiada Biologiczna',
            value: 'OBIOL',
            color: '#66c100'
        },
        {
            label: 'Olimpiada Historyczna',
            value: 'OHIS',
            color: '#9b1b09'
        },
        {
            label: 'Olimpiada Geograficzna',
            value: 'OGEO',
            color: '#fcd961'
        },
        {
            label: 'Olimpiada Literatury i Języka Polskiego',
            value: 'OLIJP',
            color: '#bc3766'
        },
        {
            label: 'Olimpiada „Losy żołnierza i dzieje oręża polskiego”',
            value: 'LOSY',
            color: '#c7ced5'
        },
        {
            label: 'Olimpiada Filozoficzna',
            value: 'OFIL',
            color: '#eddfbe'
        },
        {
            label: 'Olimpiada Wiedzy o Polsce i Świecie Współczesnym',
            value: 'OWOPISW',
            color: '#3b455e'
        },
        {
            label: 'Olimpiada Astronomiczna',
            value: 'OASTRO',
            color: '#fbd1c7'
        },
        {
            label: 'Olimpiada Języka Angielskiego',
            value: 'OJA',
            color: '#d0222c'
        },
        {
            label: 'Olimpiada Języka Niemieckiego',
            value: 'OJN',
            color: '#ff0000'
        },
        {
            label: 'Olimpiada Języka Francuskiego',
            value: 'OJFR',
            color: '#d0222c'
        }
    ] as EuiComboBoxOptionOption<string>[];
};