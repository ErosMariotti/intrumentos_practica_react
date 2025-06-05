package com.parcial.react;

import com.parcial.react.config.HashUtil;
import com.parcial.react.models.CategoriaInstrumento;
import com.parcial.react.models.Instrumentos;
import com.parcial.react.models.Usuario;
import com.parcial.react.repository.CategoriaInstrumentoRepository;
import com.parcial.react.repository.InstrumentoRepository;
import com.parcial.react.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final InstrumentoRepository instrumentoRepo;
    private final CategoriaInstrumentoRepository categoriaRepo;

    private final UsuarioRepository usuarioRepo;


    public DataInitializer(InstrumentoRepository instrumentoRepo,
                           CategoriaInstrumentoRepository categoriaRepo,
                           UsuarioRepository usuarioRepo) {
        this.instrumentoRepo  = instrumentoRepo;
        this.categoriaRepo    = categoriaRepo;
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1) Creamos y guardamos las categorías
        CategoriaInstrumento cuerda      = categoriaRepo.save(new CategoriaInstrumento(null, "Cuerda"));
        CategoriaInstrumento viento      = categoriaRepo.save(new CategoriaInstrumento(null, "Viento"));
        CategoriaInstrumento percusion   = categoriaRepo.save(new CategoriaInstrumento(null, "Percusión"));
        CategoriaInstrumento teclado     = categoriaRepo.save(new CategoriaInstrumento(null, "Teclado"));
        CategoriaInstrumento electronico = categoriaRepo.save(new CategoriaInstrumento(null, "Electrónico"));

        // ——— Usuario Admin ———
        if (usuarioRepo.findByNombreUsuario("admin").isEmpty()) {
            // Creamos un usuario Admin con clave “admin123” en SHA-256
            Usuario admin = Usuario.builder()
                    .nombreUsuario("admin")
                    .clave(HashUtil.sha256("admin123"))
                    .rol("Admin")
                    .build();
            usuarioRepo.save(admin);
            System.out.println("Usuario Admin creado: admin / admin123");
        }

        // ——— Usuario Cliente ———
        if (usuarioRepo.findByNombreUsuario("cliente").isEmpty()) {
            Usuario cliente = Usuario.builder()
                    .nombreUsuario("cliente")
                    .clave(HashUtil.sha256("cliente123"))
                    .rol("Cliente")
                    .build();
            usuarioRepo.save(cliente);
            System.out.println("Usuario Cliente creado: cliente / cliente123");
        }

        // 2) Insertamos los instrumentos vinculando cada uno a su categoría
        instrumentoRepo.saveAll(List.of(
                new Instrumentos(null,
                        "Mandolina Instrumento Musical Stagg Sunburst",
                        "Stagg", "M20", "nro10.jpg", "2450", "G", "28",
                        "Estas viendo una excelente mandolina de la marca Stagg…",
                        cuerda
                ),
                new Instrumentos(null,
                        "Pandereta Pandero Instrumento Musical",
                        "DyM ventas", "32 sonajas", "nro9.jpg", "325", "150", "10",
                        "1 Pandereta - 32 sonajas metálicas…",
                        viento
                ),
                new Instrumentos(null,
                        "Triangulo Musical 24 Cm Percusion",
                        "LBP", "24", "nro8.jpg", "260", "250", "3",
                        "Triangulo Musical de 24 Centímetros…",
                        percusion
                ),
                new Instrumentos(null,
                        "Bar Chimes Lp Cortina Musical 72 Barras",
                        "FM", "LATIN", "nro7.jpg", "2250", "G", "2",
                        "BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN…",
                        percusion
                ),
                new Instrumentos(null,
                        "Shekeres. Instrumento. Música. Artesanía.",
                        "Azalea Artesanías", "Cuentas de madera", "nro6.jpg", "850", "300", "5",
                        "Las calabazas utilizadas para nuestras artesanías…",
                        percusion
                ),
                new Instrumentos(null,
                        "Antiguo Piano Aleman Con Candelabros.",
                        "Neumeyer", "Stratus", "nro3.jpg", "17000", "2000", "0",
                        "Buen dia! Sale a la venta este Piano Alemán…",
                        teclado
                ),
                new Instrumentos(null,
                        "Guitarra Ukelele Infantil Grande 60cm",
                        "GUITARRA", "UKELELE", "nro4.jpg", "500", "G", "5",
                        "Material: Plástico simil madera…",
                        cuerda
                ),
                new Instrumentos(null,
                        "Teclado Organo Electronico Musical Instrumento 54 Teclas",
                        "GADNIC", "T01", "nro2.jpg", "2250", "G", "1375",
                        "Organo Electrónico GADNIC T01…",
                        electronico
                ),
                new Instrumentos(null,
                        "Instrumentos De Percusión Niños Set Musical Con Estuche",
                        "KNIGHT", "LB17", "nro1.jpg", "2700", "300", "15",
                        "Estas viendo un excelente y completísimo set…",
                        percusion
                ),
                new Instrumentos(null,
                        "Batería Musical Infantil Juguete Niño 9 Piezas Palillos",
                        "Bateria", "Infantil", "nro5.jpg", "850", "250", "380",
                        "DESCRIPCIÓN: DE 1 A 3 AÑOS…",
                        percusion
                )
        ));  // <-- aquí el punto y coma cierra el saveAll(...)
    }
}
