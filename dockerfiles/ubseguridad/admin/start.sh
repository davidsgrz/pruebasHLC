
#!/bin/bash
set -e
load_entrypoint_base() {
    echo "Ejecutando entrypoint base..." >> /root/logs/informe_seguridad.log
    # Buscamos el script de arranque de tu imagen base 'ubbaseclase'
    if [ -f /root/admin/base/start.sh ]; then
        bash /root/admin/base/start.sh
        echo "Entrypoint base ejecutado correctamente" >> /root/logs/informe_seguridad.log
        return 0
    else
        # Si no existe detenemos la ejecución y registramos el error
        echo "ADVERTENCIA: No se encontró /root/admin/base/start.sh" >> /root/logs/informe_seguridad.log
        return 1
    fi
}
ejecutar_auditoria() {


    # Aseguramos que exista carpeta de resultados
    echo "--- Iniciando Auditoría de Red ---" >> /root/logs/informe_seguridad.log
    
    # 1. Detectar Red
    echo "Detectando interfaz de red..." >> /root/logs/informe_seguridad.log
    local target_net=$(ip -o -f inet addr show eth0 | awk '{print $4}' | head -n 1)

    if [ -n "$target_net" ]; then
        echo "Red detectada: $target_net" >> /root/logs/informe_seguridad.log

        # 2. Ejecutar Nmap (Mapeo)
        echo "Ejecutando escaneo Nmap..." >> /root/logs/informe_seguridad.log
        # Redirigimos stderr a null para mantener el log limpio, solo queremos éxito/fallo
        # Redirigimos la salida al mismo log para ver el error si falla
        if nmap -F -sV --open -T4 "$target_net" -oX /root/resultados/scan.xml >> /root/logs/informe_seguridad.log 2>&1; then
            echo "Nmap finalizado con ÉXITO. XML generado." >> /root/logs/informe_seguridad.log

            # 3. Generar HTML (Reporte)
            echo "Generando reporte visual..." >> /root/logs/informe_seguridad.log
            if xsltproc /root/resultados/scan.xml -o /root/resultados/mapa_red.html > /dev/null 2>&1; then
                echo "Reporte HTML generado con ÉXITO en /root/resultados/mapa_red.html" >> /root/logs/informe_seguridad.log
            else
                echo "ERROR: Falló la conversión a HTML (xsltproc)" >> /root/logs/informe_seguridad.log
            fi

        else
            echo "ERROR: No se pudo completar el escaneo de Nmap" >> /root/logs/informe_seguridad.log
        fi

    else
        echo "ERROR CRÍTICO: No se pudo detectar la IP de eth0" >> /root/logs/informe_seguridad.log
    fi
}

main (){
    mkdir -p /root/logs
    touch /root/logs/informe_seguridad.log
    mkdir -p  /root/resultados
    cd /root/resultados
    touch scan.xml mapa_red.html
    load_entrypoint_base
    ejecutar_auditoria
   # tail -f /dev/null
}

main
