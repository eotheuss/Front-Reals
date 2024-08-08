document.addEventListener('DOMContentLoaded', function() {
    carregarEstados();
    $('#telefone').mask('(00) 00000-0000');
});

async function carregarEstados() {
    const estadoSelect = document.getElementById('estado');
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();

        estados.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.sigla;
            option.textContent = estado.nome;
            estadoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os estados:', error);
    }
}

async function carregarCidades() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    const estadoSelecionado = estadoSelect.value;

    // Limpa as cidades anteriores
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';

    if (estadoSelecionado) {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
            const cidades = await response.json();

            cidades.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.nome;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
                document.getElementById('cidade').disabled = ''

            });
        } catch (error) {
            console.error('Erro ao carregar as cidades:', error);
        }
    }
}
