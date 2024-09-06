
<template>
    <div class="flex justify-center card">
        <PrimeChart type="pie" :data="chartData" :options="chartOptions" class="w-52 sm:w-[18rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
    const props = defineProps({
        labels:{
            type:Array,
            required:true,
            default: () => ['Ingresos Totales', 'Gastos Totales', 'Balance Final'],
        },
        dataSet:{
            type:Array,
            required:true,
            default: () => [10000, 1000, 9000]
        }
    })

const chartData = ref();
const chartOptions = ref(
    {
        responsive: true,
        maintainAspectRatio: false
    }
);

const bgColor = ref();
const bgHover = ref();
const setChartData = () => {
    const labelsLength = props.labels.length;

    // Verifica las etiquetas y ajusta los colores en función de si están "Gastos Totales" o "Balance Final"
    if (labelsLength === 2) {
        // Si tienes solo dos datos, asegúrate de usar rojo para gastos y azul o verde para ingresos
        bgColor.value = ['#db3c30', '#3eb489']; // Rojo para gastos, azul para balance o ingresos
        bgHover.value = ['#e02d2d', '#2ecc71'];
    } else if (labelsLength === 3) {
        bgColor.value = ['#0369A1', '#f44336', '#2e7d32']; // Verde medio, Rojo, Verde oscuro
bgHover.value = ['#027abd', '#e02d2d', '#1b5e20']; // Verde oscuro, Rojo más oscuro, Verde aún más oscuro

    }

    return {
        labels: props.labels,
        datasets: [
            {
                data: props.dataSet,
                backgroundColor: bgColor.value,
                hoverBackgroundColor: bgHover.value
            }
        ]
    };
};


const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();

});
</script>
