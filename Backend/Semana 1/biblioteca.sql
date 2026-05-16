

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Banco de dados: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `empréstimo`
--

CREATE TABLE `empréstimo` (
  `CodEmp` int(11) NOT NULL,
  `Data_inicio` date NOT NULL,
  `Data_fim` date NOT NULL,
  `CodLiv` int(11) NOT NULL,
  `CodUsu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `livro`
--

CREATE TABLE `livro` (
  `CodLiv` int(11) NOT NULL,
  `Titulo` varchar(200) NOT NULL,
  `Autor` varchar(50) NOT NULL,
  `Data de publicação` date NOT NULL,
  `Editora` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuário`
--

CREATE TABLE `usuário` (
  `CodUsu` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Documento` int(11) NOT NULL,
  `Data de nascimento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `empréstimo`
--
ALTER TABLE `empréstimo`
  ADD PRIMARY KEY (`CodEmp`),
  ADD KEY `CodLiv` (`CodLiv`,`CodUsu`),
  ADD KEY `CodUsu` (`CodUsu`);

--
-- Índices de tabela `livro`
--
ALTER TABLE `livro`
  ADD PRIMARY KEY (`CodLiv`);

--
-- Índices de tabela `usuário`
--
ALTER TABLE `usuário`
  ADD PRIMARY KEY (`CodUsu`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `empréstimo`
--
ALTER TABLE `empréstimo`
  MODIFY `CodEmp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `livro`
--
ALTER TABLE `livro`
  MODIFY `CodLiv` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuário`
--
ALTER TABLE `usuário`
  MODIFY `CodUsu` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `empréstimo`
--
ALTER TABLE `empréstimo`
  ADD CONSTRAINT `empréstimo_ibfk_1` FOREIGN KEY (`CodUsu`) REFERENCES `usuário` (`CodUsu`) ON DELETE CASCADE,
  ADD CONSTRAINT `empréstimo_ibfk_2` FOREIGN KEY (`CodLiv`) REFERENCES `livro` (`CodLiv`) ON DELETE CASCADE;
COMMIT;
