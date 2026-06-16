class LivroController {

    constructor(livroService) {
        this.livroService = livroService;
    }

criar = async (req, res) => {
        try {
            const dadosDoLivro = { ...req.body };

            // Não pode ser req.body.usuarioId!
            dadosDoLivro.usuarioId = req.usuario.id;

            const resultado = await this.livroService.criar(dadosDoLivro);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    };

deletar = async (req, res) => {
        try {
            const { id } = req.params;
            await this.livroService.deletar(id);
            return res.status(200).json({ mensagem: "Livro e avaliações associadas foram removidos com sucesso" });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    };
    
    listar = async (req, res) => {
        try {
            const livros = await this.livroService.listar();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ erro: "Erro interno ao buscar livros" });
        }
    };

    buscarPorId = async (req, res) => {

        try {

            const livro =
                await this.livroService.buscarPorId(
                    req.params.id
                );

            return res.json(livro);

        } catch (error) {

            return res.status(404).json({
                erro: error.message
            });

        }

    };

}

module.exports = LivroController;