
<template>
    <div class="flex justify-center card">
        <PrimeChart type="pie" :data="chartData" :options="chartOptions" class="w-52 sm:w-[15rem]" />
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
const chartOptions = ref();

const setChartData = () => {
    return {
    labels:props.labels,
    datasets: [
        {
            data: props.dataSet,
            backgroundColor: ['#0284c7', '#f44336', '#2e7d32'], // Verde claro, Rojo, Verde oscuro
            hoverBackgroundColor: ['#4caf50', '#c62828', '#1b5e20'] // Colores más oscuros para hover
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
