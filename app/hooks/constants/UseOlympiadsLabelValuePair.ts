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
            color: 'rgb(31, 94, 182)'
        },
        {
            label: 'Olimpiada Matematyczna',
            value: 'OM',
            color: '#34343c'
        },
        {
            label: 'Olimpiada Informatyczna',
            value: 'OI',
            color: 'rgb(21, 124, 252)'
        },
        {
            label: 'Olimpiada Fizyczna',
            value: 'OFIZ',
            color: 'rgb(156, 39, 176)'
        },
        {
            label: 'Olimpiada Chemiczna',
            value: 'OLCHEM',
            color: 'rgb(255, 125, 80)'
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
            color: 'rgb(255, 175, 0)'
        },
        {
            label: 'Olimpiada Literatury i Języka Polskiego',
            value: 'OLIJP',
            color: '#bc3766'
        },
        {
            label: 'Olimpiada „Losy żołnierza i dzieje oręża polskiego”',
            value: 'LOSY',
            color: '#be7a22'
        },
        {
            label: 'Olimpiada Filozoficzna',
            value: 'OFIL',
            color: '#ff9710'
        },
        {
            label: 'Olimpiada Wiedzy o Polsce i Świecie Współczesnym',
            value: 'OWOPISW',
            color: '#3b455e'
        },
        {
            label: 'Olimpiada Astronomiczna',
            value: 'OASTRO',
            color: '#d88bff'
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
            color: '#002a7e'
        },
        {
            label: 'Olimpiada Statystyczna',
            value: 'OSTAT',
            color: '#66b68e'
        },
    ] as EuiComboBoxOptionOption<string>[];
};