package com.radiocafe.infrastructure.adapters.in.web;

import com.radiocafe.domain.model.IlustracionKappu;
import com.radiocafe.domain.ports.in.RedeemPrizeUseCase;
import com.radiocafe.domain.ports.in.SelectWinnerUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kappu")
@CrossOrigin(origins = "*")
public class KappuContestController {

    private final SelectWinnerUseCase selectWinnerUseCase;
    private final RedeemPrizeUseCase redeemPrizeUseCase;

    public KappuContestController(SelectWinnerUseCase selectWinnerUseCase, RedeemPrizeUseCase redeemPrizeUseCase) {
        this.selectWinnerUseCase = selectWinnerUseCase;
        this.redeemPrizeUseCase = redeemPrizeUseCase;
    }

    // Endpoint para el Admin: Elegir al ganador entre los finalistas y generar el QR
    @PostMapping("/select-winner/{idIlustracion}")
    public ResponseEntity<IlustracionKappu> seleccionarGanador(@PathVariable Long idIlustracion) {
        IlustracionKappu ilustracion = selectWinnerUseCase.seleccionarGanador(idIlustracion);
        return ResponseEntity.ok(ilustracion);
    }

    // Endpoint para el Barista: Validar y canjear el ticket QR en la caja
    @PostMapping("/redeem-prize")
    public ResponseEntity<IlustracionKappu> canjearPremio(@RequestParam String codigoPremio) {
        IlustracionKappu ilustracion = redeemPrizeUseCase.canjearPremioPorCodigo(codigoPremio);
        return ResponseEntity.ok(ilustracion);
    }
}