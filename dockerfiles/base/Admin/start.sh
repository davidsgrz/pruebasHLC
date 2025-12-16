
#!/bin/bash
set -e

source /root/admin/base/usuario/mainuser.sh
source /root/admin/base/ssh/mainssh.sh
source /root/admin/base/sudo/mainSudo.sh

main(){
    # Gestión de usuario --> getuser.sh
    # Gestión del sudo --> getsudo.sh
    # ...
    mkdir -p /root/logs
    touch /root/logs/informe.log
    newUser
    resuser=$?
    if [ "$resuser" -eq 0 ]; then
        configurar_sudo
        configurar_ssh
    fi

    # Encargada de mantener el contenedor en ejecución de Background
    #tail -f /dev/null   
}

main
